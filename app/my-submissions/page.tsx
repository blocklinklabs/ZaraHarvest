"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWalletStore } from "@/lib/wallet-provider";
import { toast } from "sonner";
import {
  ArrowLeft,
  Leaf,
  MapPin,
  Droplets,
  Cloud,
  Camera,
  Calendar,
  BarChart3,
  Eye,
  Download,
} from "lucide-react";

interface FarmSubmission {
  id: string;
  cropType: string;
  location: string;
  soilMoisture: number;
  weatherNotes?: string;
  temperature?: number;
  humidity?: number;
  rainfall?: number;
  latitude?: number;
  longitude?: number;
  photo?: string;
  photoMimeType?: string;
  aiAnalysis?: any;
  aiConfidence?: number;
  aiRecommendations?: string;
  createdAt: string;
}

interface DetailedSubmission extends FarmSubmission {
  photoData?: string;
  photoMimeType?: string;
}

export default function MySubmissions() {
  const router = useRouter();
  const { isConnected, account } = useWalletStore();
  const [submissions, setSubmissions] = useState<FarmSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] =
    useState<DetailedSubmission | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    } else {
      fetchSubmissions();
    }
  }, [isConnected, router]);

  const fetchSubmissions = async () => {
    if (!account?.address) return;

    try {
      const response = await fetch(
        `/api/farm-data/submit?walletAddress=${account.address}`
      );

      if (response.ok) {
        const data = await response.json();
        // Parse JSON strings for aiAnalysis and aiRecommendations
        const parsedSubmissions = (data.data || []).map((submission: any) => ({
          ...submission,
          aiAnalysis: submission.aiAnalysis
            ? JSON.parse(submission.aiAnalysis)
            : null,
          aiRecommendations: submission.aiRecommendations
            ? submission.aiRecommendations.split("; ")
            : null,
        }));
        setSubmissions(parsedSubmissions);
      } else {
        toast.error("Failed to fetch submissions");
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
      toast.error("Failed to fetch submissions");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDetailedSubmission = async (submissionId: string) => {
    if (!account?.address) return;

    setIsLoadingDetails(true);
    try {
      // First try to get the submission from the existing submissions list
      const existingSubmission = submissions.find((s) => s.id === submissionId);

      if (existingSubmission) {
        // Convert the existing submission to the detailed format
        const detailedSubmission = {
          ...existingSubmission,
          photoData: existingSubmission.photo,
          photoMimeType: existingSubmission.photoMimeType || "image/jpeg",
          aiAnalysis: existingSubmission.aiAnalysis,
          aiRecommendations: existingSubmission.aiRecommendations,
        };
        setSelectedSubmission(detailedSubmission);
        setIsLoadingDetails(false);
        return;
      }

      // If not found in existing submissions, try to fetch from API
      const response = await fetch(
        `/api/farm-data/submit?walletAddress=${account.address}&id=${submissionId}`
      );

      if (response.ok) {
        const data = await response.json();
        const detailedSubmission = data.data[0];
        // Parse JSON strings and map photo field
        const submissionWithPhotoData = {
          ...detailedSubmission,
          photoData: detailedSubmission.photo,
          photoMimeType: detailedSubmission.photoMimeType,
          aiAnalysis: detailedSubmission.aiAnalysis
            ? JSON.parse(detailedSubmission.aiAnalysis)
            : null,
          aiRecommendations: detailedSubmission.aiRecommendations
            ? detailedSubmission.aiRecommendations.split("; ")
            : null,
        };
        setSelectedSubmission(submissionWithPhotoData);
      } else {
        console.error("API Error:", response.status, response.statusText);
        toast.error("Failed to fetch submission details");
      }
    } catch (error) {
      console.error("Error fetching submission details:", error);
      toast.error("Failed to fetch submission details");
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case "excellent":
        return "text-green-600";
      case "good":
        return "text-blue-600";
      case "fair":
        return "text-yellow-600";
      case "poor":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600";
      case "medium":
        return "text-yellow-600";
      case "high":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  if (!isConnected) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                My Farm Submissions
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mt-2">
                Loading your farm data submissions...
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center py-16">
          <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-green-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-6">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              My Farm Submissions
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mt-2">
              View and manage your farm data submissions
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Total Submissions
                </p>
                <p className="text-3xl font-black text-gray-900 dark:text-white">
                  {submissions.length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Crop Types
                </p>
                <p className="text-3xl font-black text-gray-900 dark:text-white">
                  {new Set(submissions.map((s) => s.cropType)).size}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                  With Photos
                </p>
                <p className="text-3xl font-black text-gray-900 dark:text-white">
                  {submissions.filter((s) => s.photo).length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/50 flex items-center justify-center">
                <Camera className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                  AI Analyzed
                </p>
                <p className="text-3xl font-black text-gray-900 dark:text-white">
                  {submissions.filter((s) => s.aiAnalysis).length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center">
                <Cloud className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submissions List */}
      {submissions.length === 0 ? (
        <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
          <CardContent className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Leaf className="h-10 w-10 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
              No Submissions Yet
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-medium mb-8 max-w-md mx-auto">
              You haven't submitted any farm data yet. Start by submitting your
              first farm data entry.
            </p>
            <Button
              onClick={() => router.push("/submit-data")}
              className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-xl shadow-green-600/30 dark:shadow-green-600/20 rounded-2xl px-8 py-4 font-semibold text-lg transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
            >
              <Leaf className="h-5 w-5 mr-3" />
              Submit Farm Data
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {submissions.map((submission) => (
            <Card
              key={submission.id}
              className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden"
            >
              <CardHeader className="p-8 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-4 text-2xl font-black text-gray-900 dark:text-white">
                      <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                        <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      {submission.cropType}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-3 mt-3 text-lg text-gray-600 dark:text-gray-300 font-medium">
                      <MapPin className="h-5 w-5" />
                      {submission.location}
                    </CardDescription>
                  </div>
                  <Badge className="bg-gray-100 dark:bg-gray-950/50 text-gray-700 dark:text-gray-300 border-0 px-4 py-2 rounded-xl font-bold text-lg">
                    {formatDate(submission.createdAt)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                      Soil Moisture
                    </p>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">
                      {submission.soilMoisture}%
                    </p>
                  </div>
                  {submission.temperature && (
                    <div className="p-4 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                        Temperature
                      </p>
                      <p className="text-2xl font-black text-gray-900 dark:text-white">
                        {submission.temperature}°C
                      </p>
                    </div>
                  )}
                </div>

                {/* Weather Notes */}
                {submission.weatherNotes && (
                  <div className="p-4 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 backdrop-blur-sm rounded-2xl border border-blue-200/50 dark:border-blue-800/50">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                      Weather Notes
                    </p>
                    <p className="text-base text-gray-700 dark:text-gray-300 font-medium">
                      {submission.weatherNotes}
                    </p>
                  </div>
                )}

                {/* AI Analysis */}
                {submission.aiAnalysis && (
                  <div className="p-6 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 backdrop-blur-sm rounded-2xl border border-green-200/50 dark:border-green-800/50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-2xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                        <Cloud className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        AI Analysis
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-base">
                      <div className="p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                          Crop Health:{" "}
                        </span>
                        <span
                          className={`text-lg font-bold ${getHealthColor(
                            submission.aiAnalysis.cropHealth
                          )}`}
                        >
                          {submission.aiAnalysis.cropHealth}
                        </span>
                      </div>
                      <div className="p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                          Disease Risk:{" "}
                        </span>
                        <span
                          className={`text-lg font-bold ${getRiskColor(
                            submission.aiAnalysis.diseaseRisk
                          )}`}
                        >
                          {submission.aiAnalysis.diseaseRisk}
                        </span>
                      </div>
                      <div className="p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                          Soil Quality:{" "}
                        </span>
                        <span
                          className={`text-lg font-bold ${getHealthColor(
                            submission.aiAnalysis.soilQuality
                          )}`}
                        >
                          {submission.aiAnalysis.soilQuality}
                        </span>
                      </div>
                      <div className="p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                          Water Needs:{" "}
                        </span>
                        <span
                          className={`text-lg font-bold ${getRiskColor(
                            submission.aiAnalysis.waterNeeds
                          )}`}
                        >
                          {submission.aiAnalysis.waterNeeds}
                        </span>
                      </div>
                      <div className="p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                          Yield Prediction:{" "}
                        </span>
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {submission.aiAnalysis.yieldPrediction} tons/ha
                        </span>
                      </div>
                      <div className="p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                          Confidence:{" "}
                        </span>
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {Math.round((submission.aiConfidence || 0) * 100)}%
                        </span>
                      </div>
                    </div>

                    {/* Issues Preview */}
                    {submission.aiAnalysis.issues &&
                      submission.aiAnalysis.issues.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-bold text-red-700 dark:text-red-300 mb-2">
                            ⚠️ Critical Issues
                          </p>
                          <div className="p-4 bg-gradient-to-br from-red-50/80 to-rose-50/80 dark:from-red-950/30 dark:to-rose-950/30 backdrop-blur-sm rounded-xl border border-red-200/50 dark:border-red-800/50">
                            <p className="text-sm text-red-700 dark:text-red-300 font-medium line-clamp-2">
                              {submission.aiAnalysis.issues[0]}
                            </p>
                            {submission.aiAnalysis.issues.length > 1 && (
                              <p className="text-sm text-red-600 dark:text-red-400 mt-2 font-bold">
                                +{submission.aiAnalysis.issues.length - 1} more
                                issue
                                {submission.aiAnalysis.issues.length - 1 > 1
                                  ? "s"
                                  : ""}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                    {/* Recommendations Preview */}
                    {submission.aiAnalysis.recommendations &&
                      submission.aiAnalysis.recommendations.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-bold text-green-700 dark:text-green-300 mb-2">
                            💡 AI Recommendations
                          </p>
                          <div className="p-4 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 backdrop-blur-sm rounded-xl border border-green-200/50 dark:border-green-800/50">
                            <p className="text-sm text-green-700 dark:text-green-300 font-medium line-clamp-2">
                              {submission.aiAnalysis.recommendations[0]}
                            </p>
                            {submission.aiAnalysis.recommendations.length >
                              1 && (
                              <p className="text-sm text-green-600 dark:text-green-400 mt-2 font-bold">
                                +
                                {submission.aiAnalysis.recommendations.length -
                                  1}{" "}
                                more recommendation
                                {submission.aiAnalysis.recommendations.length -
                                  1 >
                                1
                                  ? "s"
                                  : ""}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchDetailedSubmission(submission.id)}
                    disabled={isLoadingDetails}
                    className="flex-1 h-12 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                  >
                    <Eye className="h-5 w-5 mr-2" />
                    {isLoadingDetails ? "Loading..." : "View Details"}
                  </Button>
                  {submission.photo && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fetchDetailedSubmission(submission.id)}
                      className="flex-1 h-12 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                    >
                      <Camera className="h-5 w-5 mr-2" />
                      View Photo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/10 dark:shadow-black/40 rounded-3xl">
            <CardHeader className="p-8 pb-6">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-4 text-3xl font-black text-gray-900 dark:text-white">
                  <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  Submission Details
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedSubmission(null)}
                  className="h-12 px-6 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                >
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-8">
              {/* Basic Info */}
              <div className="p-6 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
                  Basic Information
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                      Crop Type
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {selectedSubmission.cropType}
                    </p>
                  </div>
                  <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                      Location
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {selectedSubmission.location}
                    </p>
                  </div>
                  <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                      Soil Moisture
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {selectedSubmission.soilMoisture}%
                    </p>
                  </div>
                  <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                      Submitted
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {formatDate(selectedSubmission.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Environmental Data */}
              {(selectedSubmission.temperature ||
                selectedSubmission.humidity ||
                selectedSubmission.rainfall) && (
                <div className="p-6 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 backdrop-blur-sm rounded-2xl border border-blue-200/50 dark:border-blue-800/50">
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
                    Environmental Data
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    {selectedSubmission.temperature && (
                      <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                          Temperature
                        </p>
                        <p className="text-2xl font-black text-gray-900 dark:text-white">
                          {selectedSubmission.temperature}°C
                        </p>
                      </div>
                    )}
                    {selectedSubmission.humidity && (
                      <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                          Humidity
                        </p>
                        <p className="text-2xl font-black text-gray-900 dark:text-white">
                          {selectedSubmission.humidity}%
                        </p>
                      </div>
                    )}
                    {selectedSubmission.rainfall && (
                      <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                          Rainfall
                        </p>
                        <p className="text-2xl font-black text-gray-900 dark:text-white">
                          {selectedSubmission.rainfall}mm
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Weather Notes */}
              {selectedSubmission.weatherNotes && (
                <div className="p-6 bg-gradient-to-br from-amber-50/80 to-yellow-50/80 dark:from-amber-950/30 dark:to-yellow-950/30 backdrop-blur-sm rounded-2xl border border-amber-200/50 dark:border-amber-800/50">
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                    Weather Notes
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                    {selectedSubmission.weatherNotes}
                  </p>
                </div>
              )}

              {/* AI Analysis */}
              {selectedSubmission.aiAnalysis && (
                <div className="p-6 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 backdrop-blur-sm rounded-2xl border border-green-200/50 dark:border-green-800/50">
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
                    AI Analysis
                  </h3>
                  <div className="space-y-6">
                    {/* AI Analysis Note */}
                    <div className="p-6 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 backdrop-blur-sm rounded-2xl border border-blue-200/50 dark:border-blue-800/50">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center flex-shrink-0">
                          <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-3">
                            AI Analysis Note
                          </p>
                          <p className="text-base text-blue-700 dark:text-blue-300 font-medium mb-4">
                            This analysis was generated using Gemini AI based on
                            your farm data. The AI examined your crop
                            conditions, environmental factors, and provided
                            personalized recommendations for your{" "}
                            <span className="font-bold">
                              {selectedSubmission.cropType}
                            </span>{" "}
                            farm.
                          </p>
                          <div className="flex items-center gap-4 text-sm text-blue-600 dark:text-blue-400 font-semibold">
                            <span>
                              Confidence:{" "}
                              {Math.round(
                                (selectedSubmission.aiConfidence || 0) * 100
                              )}
                              %
                            </span>
                            <span>•</span>
                            <span>
                              Generated on{" "}
                              {formatDate(selectedSubmission.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Analysis Metrics */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-3">
                          Crop Health
                        </p>
                        <Badge
                          className={`px-4 py-2 rounded-xl font-bold text-lg ${
                            selectedSubmission.aiAnalysis.cropHealth ===
                            "excellent"
                              ? "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                              : selectedSubmission.aiAnalysis.cropHealth ===
                                "good"
                              ? "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                              : "bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
                          }`}
                        >
                          {selectedSubmission.aiAnalysis.cropHealth}
                        </Badge>
                      </div>
                      <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-3">
                          Soil Quality
                        </p>
                        <Badge
                          className={`px-4 py-2 rounded-xl font-bold text-lg ${
                            selectedSubmission.aiAnalysis.soilQuality ===
                            "excellent"
                              ? "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                              : selectedSubmission.aiAnalysis.soilQuality ===
                                "good"
                              ? "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                              : "bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
                          }`}
                        >
                          {selectedSubmission.aiAnalysis.soilQuality}
                        </Badge>
                      </div>
                      <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-3">
                          Disease Risk
                        </p>
                        <Badge
                          className={`px-4 py-2 rounded-xl font-bold text-lg ${
                            selectedSubmission.aiAnalysis.diseaseRisk === "low"
                              ? "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                              : selectedSubmission.aiAnalysis.diseaseRisk ===
                                "medium"
                              ? "bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800"
                              : "bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
                          }`}
                        >
                          {selectedSubmission.aiAnalysis.diseaseRisk}
                        </Badge>
                      </div>
                      <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-3">
                          Pest Risk
                        </p>
                        <Badge
                          className={`px-4 py-2 rounded-xl font-bold text-lg ${
                            selectedSubmission.aiAnalysis.pestRisk === "low"
                              ? "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                              : selectedSubmission.aiAnalysis.pestRisk ===
                                "medium"
                              ? "bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800"
                              : "bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
                          }`}
                        >
                          {selectedSubmission.aiAnalysis.pestRisk}
                        </Badge>
                      </div>
                      <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-3">
                          Water Needs
                        </p>
                        <Badge
                          className={`px-4 py-2 rounded-xl font-bold text-lg ${
                            selectedSubmission.aiAnalysis.waterNeeds === "low"
                              ? "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                              : selectedSubmission.aiAnalysis.waterNeeds ===
                                "medium"
                              ? "bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800"
                              : "bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
                          }`}
                        >
                          {selectedSubmission.aiAnalysis.waterNeeds}
                        </Badge>
                      </div>
                      <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-3">
                          Yield Prediction
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
                            {selectedSubmission.aiAnalysis.yieldPrediction}{" "}
                            tons/ha
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Issues Identified */}
                    {selectedSubmission.aiAnalysis.issues &&
                      selectedSubmission.aiAnalysis.issues.length > 0 && (
                        <div className="p-6 bg-gradient-to-br from-red-50/80 to-rose-50/80 dark:from-red-950/30 dark:to-rose-950/30 backdrop-blur-sm rounded-2xl border border-red-200/50 dark:border-red-800/50">
                          <p className="text-xl font-black text-red-700 dark:text-red-300 mb-4">
                            ⚠️ Issues Identified
                          </p>
                          <ul className="space-y-4">
                            {selectedSubmission.aiAnalysis.issues.map(
                              (issue: string, index: number) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-4 p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl"
                                >
                                  <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-950/50 flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-red-600 dark:text-red-400 font-bold">
                                      ⚠️
                                    </span>
                                  </div>
                                  <span className="text-base text-red-700 dark:text-red-300 font-medium">
                                    {issue}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                    {/* AI Recommendations */}
                    {selectedSubmission.aiAnalysis.recommendations &&
                      selectedSubmission.aiAnalysis.recommendations.length >
                        0 && (
                        <div className="p-6 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 backdrop-blur-sm rounded-2xl border border-green-200/50 dark:border-green-800/50">
                          <p className="text-xl font-black text-green-700 dark:text-green-300 mb-4">
                            💡 AI Recommendations
                          </p>
                          <ul className="space-y-4">
                            {selectedSubmission.aiAnalysis.recommendations.map(
                              (rec: string, index: number) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-4 p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl"
                                >
                                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-950/50 flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-green-600 dark:text-green-400 font-bold">
                                      💡
                                    </span>
                                  </div>
                                  <span className="text-base text-green-700 dark:text-green-300 font-medium">
                                    {rec}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                  </div>
                </div>
              )}

              {/* Photo */}
              {selectedSubmission.photoData && (
                <div className="p-6 bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-950/30 dark:to-pink-950/30 backdrop-blur-sm rounded-2xl border border-purple-200/50 dark:border-purple-800/50">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                      Farm Photo
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = `data:${selectedSubmission.photoMimeType};base64,${selectedSubmission.photoData}`;
                        link.download = `farm-photo-${selectedSubmission.id}.jpg`;
                        link.click();
                      }}
                      className="h-12 px-6 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Download
                    </Button>
                  </div>
                  <div className="p-6 bg-white/60 dark:bg-gray-800/60 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                    <img
                      src={`data:${selectedSubmission.photoMimeType};base64,${selectedSubmission.photoData}`}
                      alt="Farm photo"
                      className="max-w-full h-auto rounded-xl shadow-lg"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
