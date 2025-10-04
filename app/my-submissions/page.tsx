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
          aiAnalysis: detailedSubmission.aiAnalysis
            ? JSON.parse(detailedSubmission.aiAnalysis)
            : null,
          aiRecommendations: detailedSubmission.aiRecommendations
            ? detailedSubmission.aiRecommendations.split("; ")
            : null,
        };
        setSelectedSubmission(submissionWithPhotoData);
      } else {
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
      <div className="w-full space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              My Farm Submissions
            </h1>
            <p className="text-muted-foreground">
              Loading your farm data submissions...
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            My Farm Submissions
          </h1>
          <p className="text-muted-foreground">
            View and manage your farm data submissions
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Submissions
                </p>
                <p className="text-2xl font-bold">{submissions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Crop Types</p>
                <p className="text-2xl font-bold">
                  {new Set(submissions.map((s) => s.cropType)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">With Photos</p>
                <p className="text-2xl font-bold">
                  {submissions.filter((s) => s.photo).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Cloud className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">AI Analyzed</p>
                <p className="text-2xl font-bold">
                  {submissions.filter((s) => s.aiAnalysis).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submissions List */}
      {submissions.length === 0 ? (
        <Card className="dashboard-card text-center py-12">
          <CardContent>
            <Leaf className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Submissions Yet</h3>
            <p className="text-muted-foreground mb-4">
              You haven't submitted any farm data yet. Start by submitting your
              first farm data entry.
            </p>
            <Button onClick={() => router.push("/submit-data")}>
              Submit Farm Data
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {submissions.map((submission) => (
            <Card key={submission.id} className="dashboard-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="h-5 w-5" />
                      {submission.cropType}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {submission.location}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">
                    {formatDate(submission.createdAt)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Soil Moisture</p>
                    <p className="text-lg font-semibold">
                      {submission.soilMoisture}%
                    </p>
                  </div>
                  {submission.temperature && (
                    <div>
                      <p className="text-sm font-medium">Temperature</p>
                      <p className="text-lg font-semibold">
                        {submission.temperature}°C
                      </p>
                    </div>
                  )}
                </div>

                {/* Weather Notes */}
                {submission.weatherNotes && (
                  <div>
                    <p className="text-sm font-medium">Weather Notes</p>
                    <p className="text-sm text-muted-foreground">
                      {submission.weatherNotes}
                    </p>
                  </div>
                )}

                {/* AI Analysis */}
                {submission.aiAnalysis && (
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-2">AI Analysis</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Crop Health:{" "}
                        </span>
                        <span
                          className={getHealthColor(
                            submission.aiAnalysis.cropHealth
                          )}
                        >
                          {submission.aiAnalysis.cropHealth}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Disease Risk:{" "}
                        </span>
                        <span
                          className={getRiskColor(
                            submission.aiAnalysis.diseaseRisk
                          )}
                        >
                          {submission.aiAnalysis.diseaseRisk}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Soil Quality:{" "}
                        </span>
                        <span
                          className={getHealthColor(
                            submission.aiAnalysis.soilQuality
                          )}
                        >
                          {submission.aiAnalysis.soilQuality}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Water Needs:{" "}
                        </span>
                        <span
                          className={getRiskColor(
                            submission.aiAnalysis.waterNeeds
                          )}
                        >
                          {submission.aiAnalysis.waterNeeds}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Yield Prediction:{" "}
                        </span>
                        <span className="text-blue-600 font-semibold">
                          {submission.aiAnalysis.yieldPrediction} tons/ha
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Confidence:{" "}
                        </span>
                        <span className="text-blue-600">
                          {Math.round((submission.aiConfidence || 0) * 100)}%
                        </span>
                      </div>
                    </div>

                    {/* Issues Preview */}
                    {submission.aiAnalysis.issues &&
                      submission.aiAnalysis.issues.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs font-medium text-red-600 mb-1">
                            ⚠️ Critical Issues
                          </p>
                          <div className="bg-red-50 dark:bg-red-950 p-2 rounded border border-red-200 dark:border-red-800">
                            <p className="text-xs text-red-700 dark:text-red-300 line-clamp-2">
                              {submission.aiAnalysis.issues[0]}
                            </p>
                            {submission.aiAnalysis.issues.length > 1 && (
                              <p className="text-xs text-red-600 mt-1">
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
                        <div className="mt-3">
                          <p className="text-xs font-medium text-green-600 mb-1">
                            💡 AI Recommendations
                          </p>
                          <div className="bg-green-50 dark:bg-green-950 p-2 rounded border border-green-200 dark:border-green-800">
                            <p className="text-xs text-green-700 dark:text-green-300 line-clamp-2">
                              {submission.aiAnalysis.recommendations[0]}
                            </p>
                            {submission.aiAnalysis.recommendations.length >
                              1 && (
                              <p className="text-xs text-green-600 mt-1">
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
                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchDetailedSubmission(submission.id)}
                    disabled={isLoadingDetails}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {isLoadingDetails ? "Loading..." : "View Details"}
                  </Button>
                  {submission.photo && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fetchDetailedSubmission(submission.id)}
                    >
                      <Camera className="h-4 w-4 mr-2" />
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Submission Details</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedSubmission(null)}
                >
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="font-semibold mb-2">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Crop Type</p>
                    <p>{selectedSubmission.cropType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p>{selectedSubmission.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Soil Moisture</p>
                    <p>{selectedSubmission.soilMoisture}%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Submitted</p>
                    <p>{formatDate(selectedSubmission.createdAt)}</p>
                  </div>
                </div>
              </div>

              {/* Environmental Data */}
              {(selectedSubmission.temperature ||
                selectedSubmission.humidity ||
                selectedSubmission.rainfall) && (
                <div>
                  <h3 className="font-semibold mb-2">Environmental Data</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedSubmission.temperature && (
                      <div>
                        <p className="text-sm font-medium">Temperature</p>
                        <p>{selectedSubmission.temperature}°C</p>
                      </div>
                    )}
                    {selectedSubmission.humidity && (
                      <div>
                        <p className="text-sm font-medium">Humidity</p>
                        <p>{selectedSubmission.humidity}%</p>
                      </div>
                    )}
                    {selectedSubmission.rainfall && (
                      <div>
                        <p className="text-sm font-medium">Rainfall</p>
                        <p>{selectedSubmission.rainfall}mm</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Weather Notes */}
              {selectedSubmission.weatherNotes && (
                <div>
                  <h3 className="font-semibold mb-2">Weather Notes</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedSubmission.weatherNotes}
                  </p>
                </div>
              )}

              {/* AI Analysis */}
              {selectedSubmission.aiAnalysis && (
                <div>
                  <h3 className="font-semibold mb-2">AI Analysis</h3>
                  <div className="space-y-4">
                    {/* AI Analysis Note */}
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-start gap-2">
                        <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                            AI Analysis Note
                          </p>
                          <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                            This analysis was generated using Gemini AI based on
                            your farm data. The AI examined your crop
                            conditions, environmental factors, and provided
                            personalized recommendations for your{" "}
                            {selectedSubmission.cropType} farm.
                          </p>
                          <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                            Confidence:{" "}
                            {Math.round(
                              (selectedSubmission.aiConfidence || 0) * 100
                            )}
                            % • Generated on{" "}
                            {formatDate(selectedSubmission.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* AI Analysis Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Crop Health</p>
                        <Badge
                          variant={
                            selectedSubmission.aiAnalysis.cropHealth ===
                            "excellent"
                              ? "default"
                              : selectedSubmission.aiAnalysis.cropHealth ===
                                "good"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {selectedSubmission.aiAnalysis.cropHealth}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Soil Quality</p>
                        <Badge
                          variant={
                            selectedSubmission.aiAnalysis.soilQuality ===
                            "excellent"
                              ? "default"
                              : selectedSubmission.aiAnalysis.soilQuality ===
                                "good"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {selectedSubmission.aiAnalysis.soilQuality}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Disease Risk</p>
                        <Badge
                          variant={
                            selectedSubmission.aiAnalysis.diseaseRisk === "low"
                              ? "default"
                              : selectedSubmission.aiAnalysis.diseaseRisk ===
                                "medium"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {selectedSubmission.aiAnalysis.diseaseRisk}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Pest Risk</p>
                        <Badge
                          variant={
                            selectedSubmission.aiAnalysis.pestRisk === "low"
                              ? "default"
                              : selectedSubmission.aiAnalysis.pestRisk ===
                                "medium"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {selectedSubmission.aiAnalysis.pestRisk}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Water Needs</p>
                        <Badge
                          variant={
                            selectedSubmission.aiAnalysis.waterNeeds === "low"
                              ? "default"
                              : selectedSubmission.aiAnalysis.waterNeeds ===
                                "medium"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {selectedSubmission.aiAnalysis.waterNeeds}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Yield Prediction</p>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold text-primary">
                            {selectedSubmission.aiAnalysis.yieldPrediction}{" "}
                            tons/ha
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Issues Identified */}
                    {selectedSubmission.aiAnalysis.issues &&
                      selectedSubmission.aiAnalysis.issues.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-2 text-red-700 dark:text-red-300">
                            Issues Identified
                          </p>
                          <div className="bg-red-50 dark:bg-red-950 p-3 rounded-lg border border-red-200 dark:border-red-800">
                            <ul className="text-sm text-red-700 dark:text-red-300 space-y-2">
                              {selectedSubmission.aiAnalysis.issues.map(
                                (issue: string, index: number) => (
                                  <li
                                    key={index}
                                    className="flex items-start gap-2"
                                  >
                                    <span className="text-red-600 mt-1">
                                      ⚠️
                                    </span>
                                    <span>{issue}</span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      )}

                    {/* AI Recommendations */}
                    {selectedSubmission.aiAnalysis.recommendations &&
                      selectedSubmission.aiAnalysis.recommendations.length >
                        0 && (
                        <div>
                          <p className="text-sm font-medium mb-2 text-green-700 dark:text-green-300">
                            AI Recommendations
                          </p>
                          <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg border border-green-200 dark:border-green-800">
                            <ul className="text-sm text-green-700 dark:text-green-300 space-y-2">
                              {selectedSubmission.aiAnalysis.recommendations.map(
                                (rec: string, index: number) => (
                                  <li
                                    key={index}
                                    className="flex items-start gap-2"
                                  >
                                    <span className="text-green-600 mt-1">
                                      💡
                                    </span>
                                    <span>{rec}</span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              )}

              {/* Photo */}
              {selectedSubmission.photoData && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Farm Photo</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = `data:${selectedSubmission.photoMimeType};base64,${selectedSubmission.photoData}`;
                        link.download = `farm-photo-${selectedSubmission.id}.jpg`;
                        link.click();
                      }}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <div className="border rounded-lg p-4">
                    <img
                      src={`data:${selectedSubmission.photoMimeType};base64,${selectedSubmission.photoData}`}
                      alt="Farm photo"
                      className="max-w-full h-auto rounded"
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
