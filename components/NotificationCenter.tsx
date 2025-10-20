"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWalletStore } from "@/lib/wallet-provider";
import { useHybridStore } from "@/lib/hybrid-store";
import {
  Bell,
  Check,
  CheckCheck,
  ExternalLink,
  Trophy,
  DollarSign,
  AlertTriangle,
  BarChart3,
  TrendingUp,
  Target,
} from "lucide-react";
import { toast } from "sonner";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
  readAt?: string;
}

export default function NotificationCenter() {
  const { account } = useWalletStore();
  const {
    notifications,
    unreadNotificationCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    fetchNotifications,
  } = useHybridStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleFetchNotifications = async () => {
    if (!account) return;

    try {
      setIsLoading(true);
      await fetchNotifications();
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast.error("Failed to load notifications");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markNotificationAsRead(notificationId);
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast.error("Failed to mark notification as read");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      toast.success("All notifications marked as read");
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      toast.error("Failed to mark all notifications as read");
    }
  };

  const handleActionClick = (notification: Notification) => {
    if (!notification.read) {
      handleMarkAsRead(notification.id);
    }
    if (notification.actionUrl) {
      window.open(notification.actionUrl, "_blank");
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "badge_earned":
        return (
          <Trophy className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
        );
      case "loan_approved":
        return (
          <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
        );
      case "loan_due":
        return (
          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
        );
      case "yield_prediction":
        return (
          <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        );
      case "price_alert":
        return (
          <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        );
      case "achievement":
        return (
          <Target className="h-5 w-5 text-orange-600 dark:text-orange-400" />
        );
      default:
        return <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  useEffect(() => {
    if (account && isOpen) {
      handleFetchNotifications();
    }
  }, [account, isOpen]);

  // Auto-refresh notifications every 30 seconds when open
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(handleFetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [isOpen, account]);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-14 w-14 p-0 relative rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
          aria-label="Notifications"
        >
          <Bell className="h-6 w-6" />
          {unreadNotificationCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-6 w-6 flex items-center justify-center text-xs font-bold bg-red-500 hover:bg-red-600 text-white border-2 border-white dark:border-gray-950 shadow-lg"
            >
              {unreadNotificationCount > 99 ? "99+" : unreadNotificationCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-96 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/10 dark:shadow-black/40 rounded-2xl p-2"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-800/50">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Notifications
          </h3>
          {unreadNotificationCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="text-sm font-semibold text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/30 rounded-xl px-3 py-2"
            >
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark all read
            </Button>
          )}
        </div>

        <ScrollArea className="h-96">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="inline-flex items-center gap-3 text-gray-500 dark:text-gray-400">
                <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 border-t-green-500 rounded-full animate-spin"></div>
                <span className="text-sm font-medium">
                  Loading notifications...
                </span>
              </div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <Bell className="h-8 w-8 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                No notifications yet
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                We'll notify you when something important happens
              </p>
            </div>
          ) : (
            <div className="p-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                    !notification.read
                      ? "bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500"
                      : "hover:shadow-sm"
                  }`}
                  onClick={() => handleActionClick(notification)}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                        !notification.read
                          ? "bg-blue-100 dark:bg-blue-900/30"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 animate-pulse" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg">
                          {formatTimeAgo(notification.createdAt)}
                        </span>
                        <div className="flex items-center gap-2">
                          {notification.actionUrl && (
                            <div className="w-6 h-6 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                              <ExternalLink className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                            </div>
                          )}
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMarkAsRead(notification.id);
                              }}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-800 my-2" />
            <div className="p-3">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl py-3"
                onClick={() => {
                  // Navigate to notifications page if it exists
                  window.location.href = "/notifications";
                }}
              >
                View all notifications
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
