"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNotificationStore } from "@/lib/notification-store";
import {
  Bell,
  Check,
  Trash2,
  MoreHorizontal,
  ExternalLink,
  AlertCircle,
  Info,
  CheckCircle,
  Clock,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function NotificationCenter() {
  const router = useRouter();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
  } = useNotificationStore();

  const [isOpen, setIsOpen] = useState(false);

  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }

    if (notification.actionUrl) {
      router.push(notification.actionUrl);
      setIsOpen(false);
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <AlertCircle className="h-3 w-3 text-red-500" />;
      case "high":
        return <AlertCircle className="h-3 w-3 text-orange-500" />;
      case "medium":
        return <Info className="h-3 w-3 text-blue-500" />;
      case "low":
        return <CheckCircle className="h-3 w-3 text-green-500" />;
      default:
        return <Clock className="h-3 w-3 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "border-l-red-500 bg-red-50 dark:bg-red-950/20";
      case "high":
        return "border-l-orange-500 bg-orange-50 dark:bg-orange-950/20";
      case "medium":
        return "border-l-blue-500 bg-blue-50 dark:bg-blue-950/20";
      case "low":
        return "border-l-green-500 bg-green-50 dark:bg-green-950/20";
      default:
        return "border-l-gray-500 bg-gray-50 dark:bg-gray-950/20";
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 relative"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs"
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </Badge>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Notifications ({unreadCount} unread)</p>
          </TooltipContent>
        </Tooltip>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-96 max-h-[500px] overflow-hidden shadow-2xl border-green-500/20"
      >
        <div className="flex items-center justify-between p-4 border-b border-green-500/20 bg-green-50/50 dark:bg-green-950/20">
          <DropdownMenuLabel className="font-semibold text-lg flex items-center gap-2">
            <Bell className="h-5 w-5 text-green-600 dark:text-green-400" />
            Notifications
            {unreadCount > 0 && (
              <Badge
                variant="secondary"
                className="ml-2 bg-green-600 text-white"
              >
                {unreadCount}
              </Badge>
            )}
          </DropdownMenuLabel>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="h-7 px-2 text-xs bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50"
              >
                <Check className="h-3 w-3 mr-1" />
                Mark all read
              </Button>
            )}
            <DropdownMenuItem
              onClick={clearAllNotifications}
              className="h-7 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Clear all
            </DropdownMenuItem>
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">
              <div className="w-12 h-12 mx-auto rounded-full bg-green-100 dark:bg-green-950/50 flex items-center justify-center mb-3">
                <Bell className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <p className="font-medium">No notifications yet</p>
              <p className="text-xs">
                We'll notify you about important updates
              </p>
            </div>
          ) : (
            notifications.slice(0, 8).map((notification, index) => (
              <div key={notification.id}>
                <div
                  className={`p-4 border-l-4 cursor-pointer hover:bg-green-50/50 dark:hover:bg-green-950/20 transition-all duration-200 ${
                    !notification.read
                      ? getPriorityColor(notification.priority)
                      : "border-green-500/20 bg-white/80 dark:bg-gray-900/80"
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg">{notification.icon}</span>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                        )}
                      </div>

                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">
                        {notification.message}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getPriorityIcon(notification.priority)}
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            {formatDistanceToNow(notification.timestamp, {
                              addSuffix: true,
                            })}
                          </span>
                        </div>

                        {notification.actionUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-xs bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNotificationClick(notification);
                            }}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            {notification.actionText || "View"}
                          </Button>
                        )}
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {!notification.read && (
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                            }}
                          >
                            <Check className="h-3 w-3 mr-2" />
                            Mark as read
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {index < notifications.length - 1 && <Separator />}
              </div>
            ))
          )}
        </div>

        {notifications.length > 8 && (
          <>
            <Separator className="bg-green-500/20" />
            <div className="p-3 bg-green-50/50 dark:bg-green-950/20">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-sm bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50"
                onClick={() => {
                  router.push("/notifications");
                  setIsOpen(false);
                }}
              >
                View all notifications ({notifications.length})
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
