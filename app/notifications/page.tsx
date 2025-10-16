"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNotificationStore } from "@/lib/notification-store";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Check,
  Trash2,
  Search,
  Filter,
  AlertCircle,
  Info,
  CheckCircle,
  Clock,
  Settings,
  Eye,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

export default function NotificationsPage() {
  const router = useRouter();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
  } = useNotificationStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriority =
      filterPriority === "all" || notification.priority === filterPriority;
    const matchesType =
      filterType === "all" || notification.type === filterType;

    return matchesSearch && matchesPriority && matchesType;
  });

  const unreadNotifications = filteredNotifications.filter((n) => !n.read);
  const readNotifications = filteredNotifications.filter((n) => n.read);

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "high":
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case "medium":
        return <Info className="h-4 w-4 text-blue-500" />;
      case "low":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
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

  const NotificationCard = ({ notification }: { notification: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={`mb-4 border-l-4 cursor-pointer hover:shadow-xl hover:shadow-green-500/10 hover:-translate-y-1 transition-all duration-300 group ${
          !notification.read
            ? getPriorityColor(notification.priority)
            : "border-green-500/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
        }`}
        onClick={() => {
          if (!notification.read) markAsRead(notification.id);
          if (notification.actionUrl) router.push(notification.actionUrl);
        }}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl">{notification.icon}</span>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-base text-gray-900 dark:text-white">
                    {notification.title}
                  </h3>
                  {getPriorityIcon(notification.priority)}
                  {!notification.read && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                    >
                      New
                    </Badge>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {notification.message}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {format(notification.timestamp, "MMM dd, yyyy")} at{" "}
                  {format(notification.timestamp, "HH:mm")}
                </span>
                <span>
                  {formatDistanceToNow(notification.timestamp, {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!notification.read && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    markAsRead(notification.id);
                  }}
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNotification(notification.id);
                }}
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
              <Bell className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Notifications
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Stay updated with your farming activities and important alerts
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          {unreadCount > 0 && (
            <Button
              onClick={markAllAsRead}
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              <Check className="h-4 w-4 mr-2" />
              Mark all read
            </Button>
          )}
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="border-green-500/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span>Filters & Search</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-green-500/20 focus:border-green-500"
                />
              </div>

              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="border-green-500/20 focus:border-green-500">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="border-green-500/20 focus:border-green-500">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="harvest_prediction">
                    Harvest Predictions
                  </SelectItem>
                  <SelectItem value="weather_alert">Weather Alerts</SelectItem>
                  <SelectItem value="loan_approved">Loan Approvals</SelectItem>
                  <SelectItem value="loan_due">Loan Due</SelectItem>
                  <SelectItem value="market_price">Market Prices</SelectItem>
                  <SelectItem value="reward_earned">Rewards</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={clearAllNotifications}
                className="text-red-600 hover:text-red-700 border-red-500/20 hover:border-red-500"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notification Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="border-green-500/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Bell className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Notifications
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {notifications.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Unread
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {unreadCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Read
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {notifications.length - unreadCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              All ({filteredNotifications.length})
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              Unread ({unreadNotifications.length})
            </TabsTrigger>
            <TabsTrigger
              value="read"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              Read ({readNotifications.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <Card className="border-green-500/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-950/50 flex items-center justify-center mb-6">
                    <Bell className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    No notifications found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    {searchTerm ||
                    filterPriority !== "all" ||
                    filterType !== "all"
                      ? "Try adjusting your filters to see more notifications."
                      : "You'll receive notifications about your farming activities here."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <AnimatePresence>
                {filteredNotifications.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                  />
                ))}
              </AnimatePresence>
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {unreadNotifications.length === 0 ? (
              <Card className="border-green-500/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-950/50 flex items-center justify-center mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    All caught up!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    You have no unread notifications.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <AnimatePresence>
                {unreadNotifications.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                  />
                ))}
              </AnimatePresence>
            )}
          </TabsContent>

          <TabsContent value="read" className="space-y-4">
            {readNotifications.length === 0 ? (
              <Card className="border-green-500/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-950/50 flex items-center justify-center mb-6">
                    <Clock className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    No read notifications
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Read notifications will appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <AnimatePresence>
                {readNotifications.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                  />
                ))}
              </AnimatePresence>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
