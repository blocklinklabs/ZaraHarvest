#!/bin/bash

# Auto-push script for git repository
# Pushes code every 25 minutes with max 5 file changes per commit
# Usage: ./auto-push.sh

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
INTERVAL_MINUTES=25
MAX_FILES=5
REPO_PATH="$(pwd)"
LOG_FILE="$REPO_PATH/auto-push.log"

# Function to log messages with timestamp
log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Function to check if we're in a git repository
check_git_repo() {
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        log_message "${RED}Error: Not in a git repository${NC}"
        exit 1
    fi
}

# Function to check for changes
check_changes() {
    # Check for staged changes
    staged_files=$(git diff --cached --name-only | wc -l)
    
    # Check for unstaged changes
    unstaged_files=$(git diff --name-only | wc -l)
    
    # Check for untracked files
    untracked_files=$(git ls-files --others --exclude-standard | wc -l)
    
    total_changes=$((staged_files + unstaged_files + untracked_files))
    
    echo "$total_changes"
}

# Function to get list of changed files
get_changed_files() {
    # Get all changed files (staged, unstaged, and untracked)
    staged=$(git diff --cached --name-only)
    unstaged=$(git diff --name-only)
    untracked=$(git ls-files --others --exclude-standard)
    
    # Combine and remove duplicates
    all_files=$(echo -e "$staged\n$unstaged\n$untracked" | sort -u | grep -v '^$')
    echo "$all_files"
}

# Function to commit and push changes
commit_and_push() {
    local files_to_commit=("$@")
    local file_count=${#files_to_commit[@]}
    
    if [ $file_count -eq 0 ]; then
        log_message "${YELLOW}No files to commit${NC}"
        return 1
    fi
    
    # Add files to staging
    for file in "${files_to_commit[@]}"; do
        git add "$file"
        log_message "${BLUE}Added: $file${NC}"
    done
    
    # Create commit message
    commit_msg="Auto-commit: $file_count file(s) changed at $(date '+%Y-%m-%d %H:%M:%S')"
    
    # Commit changes
    if git commit -m "$commit_msg"; then
        log_message "${GREEN}Committed $file_count file(s)${NC}"
        
        # Push to remote with upstream tracking
        if git push -u origin main; then
            log_message "${GREEN}Successfully pushed to remote${NC}"
            return 0
        else
            log_message "${RED}Failed to push to remote${NC}"
            return 1
        fi
    else
        log_message "${RED}Failed to commit changes${NC}"
        return 1
    fi
}

# Function to handle the main push logic
handle_push() {
    local total_changes=$(check_changes)
    
    if [ $total_changes -eq 0 ]; then
        log_message "${YELLOW}No changes detected${NC}"
        return 0
    fi
    
    log_message "${BLUE}Detected $total_changes file(s) with changes${NC}"
    
    # Check if this is the first commit (no commits exist yet)
    if ! git rev-parse HEAD > /dev/null 2>&1; then
        log_message "${BLUE}First commit detected, committing all files regardless of limit${NC}"
        handle_initial_commit
        return $?
    fi
    
    if [ $total_changes -gt $MAX_FILES ]; then
        log_message "${YELLOW}Too many changes ($total_changes > $MAX_FILES). Skipping this push.${NC}"
        log_message "${YELLOW}Please commit manually or increase MAX_FILES limit${NC}"
        return 1
    fi
    
    # Get list of changed files
    local changed_files=($(get_changed_files))
    
    if [ ${#changed_files[@]} -eq 0 ]; then
        log_message "${YELLOW}No files to process${NC}"
        return 0
    fi
    
    # Commit and push
    commit_and_push "${changed_files[@]}"
}

# Function to show help
show_help() {
    echo "Auto-push script for git repository"
    echo ""
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -h, --help     Show this help message"
    echo "  -t, --test     Test mode (run once and exit)"
    echo "  -s, --start    Start the auto-push daemon"
    echo "  -c, --check    Check current status"
    echo ""
    echo "Configuration:"
    echo "  INTERVAL_MINUTES: $INTERVAL_MINUTES minutes"
    echo "  MAX_FILES: $MAX_FILES files per commit"
    echo "  LOG_FILE: $LOG_FILE"
    echo ""
}

# Function to check current status
check_status() {
    log_message "${BLUE}=== Auto-push Status ===${NC}"
    log_message "Repository: $REPO_PATH"
    log_message "Interval: $INTERVAL_MINUTES minutes"
    log_message "Max files per commit: $MAX_FILES"
    
    # Check git configuration
    local git_user=$(git config user.name)
    local git_email=$(git config user.email)
    log_message "Git user: $git_user <$git_email>"
    
    local changes=$(check_changes)
    log_message "Current changes: $changes file(s)"
    
    if [ $changes -gt 0 ]; then
        log_message "${YELLOW}Changed files:${NC}"
        get_changed_files | while read -r file; do
            log_message "  - $file"
        done
    fi
    
    # Check if there's a remote configured
    if git remote -v | grep -q .; then
        log_message "Remote repositories configured:"
        git remote -v | while read -r line; do
            log_message "  $line"
        done
    else
        log_message "${YELLOW}Warning: No remote repositories configured${NC}"
    fi
    
    # Check if this is the first commit
    if ! git rev-parse HEAD > /dev/null 2>&1; then
        log_message "${YELLOW}This appears to be a new repository (no commits yet)${NC}"
    fi
}

# Function to handle initial commit
handle_initial_commit() {
    if ! git rev-parse HEAD > /dev/null 2>&1; then
        log_message "${BLUE}Detected new repository, performing initial commit...${NC}"
        
        # Add all files
        git add .
        
        # Create initial commit
        if git commit -m "Initial commit: AgriYield project setup"; then
            log_message "${GREEN}Initial commit created${NC}"
            
            # Push to remote
            if git push -u origin main; then
                log_message "${GREEN}Initial commit pushed to remote${NC}"
                return 0
            else
                log_message "${RED}Failed to push initial commit${NC}"
                return 1
            fi
        else
            log_message "${RED}Failed to create initial commit${NC}"
            return 1
        fi
    fi
    return 0
}

# Main function
main() {
    # Parse command line arguments
    case "${1:-}" in
        -h|--help)
            show_help
            exit 0
            ;;
        -t|--test)
            log_message "${BLUE}Running in test mode${NC}"
            check_git_repo
            handle_push
            exit $?
            ;;
        -c|--check)
            check_git_repo
            check_status
            exit 0
            ;;
        -s|--start)
            log_message "${GREEN}Starting auto-push daemon${NC}"
            ;;
        "")
            log_message "${GREEN}Starting auto-push daemon${NC}"
            ;;
        *)
            echo "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
    
    # Check if we're in a git repository
    check_git_repo
    
    # Initialize log file
    log_message "${GREEN}Auto-push daemon started${NC}"
    log_message "Repository: $REPO_PATH"
    log_message "Interval: $INTERVAL_MINUTES minutes"
    log_message "Max files per commit: $MAX_FILES"
    
    # Handle initial commit if this is a new repository
    handle_initial_commit
    
    # Main loop
    while true; do
        log_message "${BLUE}Checking for changes...${NC}"
        handle_push
        
        log_message "${BLUE}Waiting $INTERVAL_MINUTES minutes until next check...${NC}"
        sleep $((INTERVAL_MINUTES * 60))
    done
}

# Trap signals for graceful shutdown
trap 'log_message "${YELLOW}Auto-push daemon stopped${NC}"; exit 0' SIGINT SIGTERM

# Run main function
main "$@"
