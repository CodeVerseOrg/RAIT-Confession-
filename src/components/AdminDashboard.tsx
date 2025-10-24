import { useState } from 'react';
import { LogOutIcon, TrashIcon, EyeIcon, AlertTriangleIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { ScrollArea } from './components/ui/scroll-area';
import { Separator } from './components/ui/separator';
import { Avatar, AvatarFallback } from './components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './components/ui/dialog';
import { useAdminStore } from './stores/adminStore';
import { useConfessionStore } from './stores/confessionStore';
import { useToast } from './hooks/use-toast';

export function AdminDashboard() {
  const [selectedConfession, setSelectedConfession] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { logout, currentAdmin, reports, updateReportStatus, getPostMetadata } = useAdminStore();
  const { confessions, likeConfession } = useConfessionStore();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged Out',
      description: 'You have been logged out successfully',
    });
  };

  const handleDeleteConfession = (id: string) => {
    setSelectedConfession(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedConfession) {
      toast({
        title: 'Post Deleted',
        description: `Confession #${selectedConfession} has been deleted`,
      });
      setDeleteDialogOpen(false);
      setSelectedConfession(null);
    }
  };

  const handleReportAction = (reportId: string, status: 'reviewed' | 'resolved') => {
    updateReportStatus(reportId, status);
    toast({
      title: 'Report Updated',
      description: `Report status changed to ${status}`,
    });
  };

  const formatTimestamp = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  const pendingReports = reports.filter((r) => r.status === 'pending');
  const reviewedReports = reports.filter((r) => r.status === 'reviewed');

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-1 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-headline font-bold text-primary-foreground">
                Admin Dashboard
              </h1>
              <p className="text-sm text-primary-foreground/80">
                Welcome, {currentAdmin?.username}
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="bg-white/10 text-primary-foreground hover:bg-white/20"
            >
              <LogOutIcon size={20} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card text-card-foreground">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{confessions.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-card text-card-foreground">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">{pendingReports.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-card text-card-foreground">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Reviewed Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{reviewedReports.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="posts">All Posts</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4">
            <Card className="bg-card text-card-foreground">
              <CardHeader>
                <CardTitle className="text-gray-900">All Confessions</CardTitle>
                <CardDescription className="text-gray-600">
                  Monitor and manage all posts with IP tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {confessions.map((confession) => {
                      const metadata = getPostMetadata(confession.id);
                      return (
                        <Card key={confession.id} className="bg-gray-50 border border-gray-200">
                          <CardContent className="pt-6">
                            <div className="flex items-start gap-4 mb-4">
                              <Avatar className="h-10 w-10 border-2 border-primary/20">
                                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                                  AN
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <div>
                                    <p className="font-semibold text-gray-900">
                                      Confession #{confession.id}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {formatTimestamp(confession.timestamp)}
                                    </p>
                                  </div>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDeleteConfession(confession.id)}
                                  >
                                    <TrashIcon size={16} className="mr-2" />
                                    Delete
                                  </Button>
                                </div>
                                <p className="text-gray-800 mb-3">{confession.content}</p>
                                
                                {metadata && (
                                  <div className="bg-white rounded-lg p-3 space-y-2 border border-gray-200">
                                    <h4 className="font-semibold text-sm text-gray-900 flex items-center gap-2">
                                      <EyeIcon size={16} />
                                      Post Metadata
                                    </h4>
                                    <div className="text-xs space-y-1 text-gray-700">
                                      <p>
                                        <span className="font-medium">IP Address:</span>{' '}
                                        {metadata.ipAddress}
                                      </p>
                                      <p>
                                        <span className="font-medium">User Agent:</span>{' '}
                                        {metadata.userAgent}
                                      </p>
                                      <p>
                                        <span className="font-medium">Posted:</span>{' '}
                                        {formatTimestamp(metadata.timestamp)}
                                      </p>
                                    </div>
                                  </div>
                                )}

                                <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                                  <span>❤️ {confession.likes}</span>
                                  <span>💬 {confession.comments}</span>
                                  <span>🔄 {confession.shares}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card className="bg-card text-card-foreground">
              <CardHeader>
                <CardTitle className="text-gray-900">Reported Posts</CardTitle>
                <CardDescription className="text-gray-600">
                  Review and take action on reported content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {reports.length === 0 ? (
                      <div className="text-center py-12 text-gray-600">
                        <AlertTriangleIcon size={48} className="mx-auto mb-4 text-gray-400" />
                        <p>No reports found</p>
                      </div>
                    ) : (
                      reports.map((report) => {
                        const confession = confessions.find((c) => c.id === report.confessionId);
                        const metadata = getPostMetadata(report.confessionId);
                        
                        return (
                          <Card
                            key={report.id}
                            className={`border-2 ${
                              report.status === 'pending'
                                ? 'border-warning bg-warning/5'
                                : report.status === 'reviewed'
                                ? 'border-primary bg-primary/5'
                                : 'border-success bg-success/5'
                            }`}
                          >
                            <CardContent className="pt-6">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold text-gray-900">
                                      Report #{report.id}
                                    </h3>
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        report.status === 'pending'
                                          ? 'bg-warning text-white'
                                          : report.status === 'reviewed'
                                          ? 'bg-primary text-white'
                                          : 'bg-success text-white'
                                      }`}
                                    >
                                      {report.status}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-600">
                                    Reported: {formatTimestamp(report.reportedAt)}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  {report.status === 'pending' && (
                                    <Button
                                      size="sm"
                                      onClick={() => handleReportAction(report.id, 'reviewed')}
                                      className="bg-primary text-primary-foreground"
                                    >
                                      <CheckCircleIcon size={16} className="mr-2" />
                                      Review
                                    </Button>
                                  )}
                                  {report.status === 'reviewed' && (
                                    <Button
                                      size="sm"
                                      onClick={() => handleReportAction(report.id, 'resolved')}
                                      className="bg-success text-white hover:bg-success/90"
                                    >
                                      <CheckCircleIcon size={16} className="mr-2" />
                                      Resolve
                                    </Button>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDeleteConfession(report.confessionId)}
                                  >
                                    <TrashIcon size={16} className="mr-2" />
                                    Delete Post
                                  </Button>
                                </div>
                              </div>

                              <div className="bg-white rounded-lg p-4 mb-3 border border-gray-200">
                                <p className="text-sm font-medium text-gray-900 mb-2">
                                  Reason: {report.reason}
                                </p>
                                {confession && (
                                  <div>
                                    <Separator className="my-3" />
                                    <p className="text-sm text-gray-700 mb-2">
                                      <span className="font-medium">Confession #{confession.id}:</span>
                                    </p>
                                    <p className="text-sm text-gray-800">{confession.content}</p>
                                  </div>
                                )}
                              </div>

                              {metadata && (
                                <div className="bg-white rounded-lg p-3 space-y-2 border border-gray-200">
                                  <h4 className="font-semibold text-sm text-gray-900 flex items-center gap-2">
                                    <EyeIcon size={16} />
                                    Post Metadata
                                  </h4>
                                  <div className="text-xs space-y-1 text-gray-700">
                                    <p>
                                      <span className="font-medium">IP Address:</span>{' '}
                                      {metadata.ipAddress}
                                    </p>
                                    <p>
                                      <span className="font-medium">User Agent:</span>{' '}
                                      {metadata.userAgent}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        );
                      })
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Delete Confession</DialogTitle>
            <DialogDescription className="text-gray-600">
              Are you sure you want to delete this confession? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setDeleteDialogOpen(false)}
              className="text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
