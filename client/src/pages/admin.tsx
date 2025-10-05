import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { useEffect } from 'react';
import { Download, Mail, Phone, MapPin, MessageSquare, Calendar, LogOut, Edit2, Trash2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { Inquiry } from '@shared/schema';
import { format } from 'date-fns';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

const PLATFORMS = [
  { id: 'all', label: 'All Platforms' },
  { id: 'yash-saxena', label: 'Yash Saxena' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'reddit', label: 'Reddit' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'google', label: 'Google' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'snapchat', label: 'Snapchat' },
];

export default function Admin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [editingRemarkId, setEditingRemarkId] = useState<string | null>(null);
  const [remarkText, setRemarkText] = useState('');
  const [deleteInquiryId, setDeleteInquiryId] = useState<string | null>(null);

  const { data: authData, isLoading: authLoading } = useQuery<{ success: boolean; user?: any }>({
    queryKey: ['/api/auth/me'],
    retry: false,
  });

  const { data, isLoading } = useQuery<{ success: boolean; inquiries: Inquiry[] }>({
    queryKey: ['/api/inquiries'],
    enabled: authData?.success === true,
  });

  useEffect(() => {
    if (!authLoading && authData?.success !== true) {
      setLocation('/login');
    }
  }, [authData, authLoading, setLocation]);

  const handleLogout = async () => {
    try {
      await apiRequest('POST', '/api/auth/logout', {});
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out',
      });
      setLocation('/login');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to logout',
        variant: 'destructive',
      });
    }
  };

  const updateRemarkMutation = useMutation({
    mutationFn: async ({ id, remarks }: { id: string; remarks: string }) => {
      const response = await apiRequest('PATCH', `/api/inquiries/${id}/remark`, { remarks });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/inquiries'] });
      toast({
        title: 'Success',
        description: 'Remark updated successfully',
      });
      setEditingRemarkId(null);
      setRemarkText('');
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update remark',
        variant: 'destructive',
      });
    },
  });

  const deleteInquiryMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest('DELETE', `/api/inquiries/${id}`, {});
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/inquiries'] });
      toast({
        title: 'Success',
        description: 'Inquiry deleted successfully',
      });
      setDeleteInquiryId(null);
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to delete inquiry',
        variant: 'destructive',
      });
    },
  });

  const startEditingRemark = (inquiry: Inquiry) => {
    setEditingRemarkId(inquiry.id);
    setRemarkText(inquiry.remarks || '');
  };

  const cancelEditingRemark = () => {
    setEditingRemarkId(null);
    setRemarkText('');
  };

  const saveRemark = (id: string) => {
    updateRemarkMutation.mutate({ id, remarks: remarkText });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (authData?.success !== true) {
    return null;
  }

  const allInquiries = data?.inquiries || [];
  const filteredInquiries = selectedPlatform === 'all' 
    ? allInquiries 
    : allInquiries.filter(inq => inq.platform === selectedPlatform);

  const downloadCSV = () => {
    if (filteredInquiries.length === 0) return;

    const headers = ['Date', 'Name', 'Email', 'Phone', 'Country', 'Platform', 'Message', 'Remarks'];
    const csvContent = [
      headers.join(','),
      ...filteredInquiries.map(inq => [
        format(new Date(inq.createdAt), 'yyyy-MM-dd HH:mm:ss'),
        `"${inq.name}"`,
        inq.email,
        inq.phone,
        inq.country,
        inq.platform,
        `"${inq.message.replace(/"/g, '""')}"`,
        `"${(inq.remarks || '').replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    const platformSuffix = selectedPlatform === 'all' ? 'all' : selectedPlatform;
    link.setAttribute('download', `enquiries_${platformSuffix}_${format(new Date(), 'yyyy-MM-dd_HHmmss')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      'yash-saxena': 'bg-purple-100 text-purple-800',
      facebook: 'bg-blue-100 text-blue-800',
      instagram: 'bg-pink-100 text-pink-800',
      reddit: 'bg-orange-100 text-orange-800',
      youtube: 'bg-red-100 text-red-800',
      google: 'bg-blue-50 text-blue-600',
      linkedin: 'bg-blue-100 text-blue-700',
      tiktok: 'bg-gray-100 text-gray-800',
      snapchat: 'bg-yellow-100 text-yellow-800',
    };
    return colors[platform] || 'bg-gray-100 text-gray-800';
  };

  const InquiriesTable = ({ inquiries }: { inquiries: Inquiry[] }) => (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead data-testid="header-date">Date</TableHead>
            <TableHead data-testid="header-name">Name</TableHead>
            <TableHead data-testid="header-contact">Contact</TableHead>
            {selectedPlatform === 'all' && <TableHead data-testid="header-platform">Platform</TableHead>}
            <TableHead data-testid="header-message">Message</TableHead>
            <TableHead data-testid="header-remarks">Remarks</TableHead>
            <TableHead data-testid="header-actions">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquiries.map((inquiry) => (
            <TableRow key={inquiry.id} data-testid={`row-enquiry-${inquiry.id}`}>
              <TableCell className="whitespace-nowrap" data-testid={`date-${inquiry.id}`}>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  {format(new Date(inquiry.createdAt), 'MMM dd, yyyy')}
                </div>
                <div className="text-xs text-gray-500 ml-6">
                  {format(new Date(inquiry.createdAt), 'HH:mm')}
                </div>
              </TableCell>
              <TableCell data-testid={`name-${inquiry.id}`}>
                <div className="font-medium">{inquiry.name}</div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-3 w-3 mr-1" />
                  {inquiry.country}
                </div>
              </TableCell>
              <TableCell data-testid={`contact-${inquiry.id}`}>
                <div className="flex items-center text-sm mb-1">
                  <Mail className="h-3 w-3 mr-2 text-gray-400" />
                  <a href={`mailto:${inquiry.email}`} className="text-blue-600 hover:underline">
                    {inquiry.email}
                  </a>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-3 w-3 mr-2 text-gray-400" />
                  {inquiry.phone}
                </div>
              </TableCell>
              {selectedPlatform === 'all' && (
                <TableCell data-testid={`platform-${inquiry.id}`}>
                  <Badge className={getPlatformColor(inquiry.platform)}>
                    {inquiry.platform === 'yash-saxena' 
                      ? 'Yash Saxena' 
                      : inquiry.platform.charAt(0).toUpperCase() + inquiry.platform.slice(1)}
                  </Badge>
                </TableCell>
              )}
              <TableCell className="max-w-md" data-testid={`message-${inquiry.id}`}>
                <p className="text-sm text-gray-700 line-clamp-2">{inquiry.message}</p>
              </TableCell>
              <TableCell className="max-w-xs" data-testid={`remarks-${inquiry.id}`}>
                {editingRemarkId === inquiry.id ? (
                  <div className="space-y-2">
                    <Textarea
                      value={remarkText}
                      onChange={(e) => setRemarkText(e.target.value)}
                      placeholder="Add remarks..."
                      className="min-h-[80px]"
                      data-testid={`textarea-remark-${inquiry.id}`}
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => saveRemark(inquiry.id)}
                        disabled={updateRemarkMutation.isPending}
                        data-testid={`button-save-remark-${inquiry.id}`}
                      >
                        <Save className="h-3 w-3 mr-1" />
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={cancelEditingRemark}
                        data-testid={`button-cancel-remark-${inquiry.id}`}
                      >
                        <X className="h-3 w-3 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-600">
                    {inquiry.remarks || <span className="text-gray-400 italic">No remarks</span>}
                  </div>
                )}
              </TableCell>
              <TableCell data-testid={`actions-${inquiry.id}`}>
                <div className="flex gap-2">
                  {editingRemarkId !== inquiry.id && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startEditingRemark(inquiry)}
                      data-testid={`button-edit-remark-${inquiry.id}`}
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setDeleteInquiryId(inquiry.id)}
                    data-testid={`button-delete-${inquiry.id}`}
                  >
                    <Trash2 className="h-3 w-3 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2" data-testid="text-admin-title">Admin Dashboard</h1>
            <p className="text-gray-600" data-testid="text-admin-subtitle">View and manage all enquiry submissions</p>
          </div>
          <Button 
            onClick={handleLogout} 
            variant="outline"
            data-testid="button-logout"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle data-testid="text-enquiries-count">
                {selectedPlatform === 'all' 
                  ? `Total Enquiries: ${allInquiries.length}` 
                  : `${PLATFORMS.find(p => p.id === selectedPlatform)?.label} Enquiries: ${filteredInquiries.length}`}
              </CardTitle>
              <CardDescription>
                {selectedPlatform === 'all' 
                  ? 'All submissions from your landing pages' 
                  : `Submissions from ${PLATFORMS.find(p => p.id === selectedPlatform)?.label} page`}
              </CardDescription>
            </div>
            <Button 
              onClick={downloadCSV} 
              disabled={filteredInquiries.length === 0}
              data-testid="button-download-csv"
            >
              <Download className="mr-2 h-4 w-4" />
              Download CSV
            </Button>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedPlatform} onValueChange={setSelectedPlatform} className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-6" data-testid="tabs-platforms">
                {PLATFORMS.map(platform => (
                  <TabsTrigger 
                    key={platform.id} 
                    value={platform.id}
                    data-testid={`tab-${platform.id}`}
                  >
                    {platform.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {PLATFORMS.map(platform => (
                <TabsContent key={platform.id} value={platform.id}>
                  {isLoading ? (
                    <div className="flex items-center justify-center h-64" data-testid="loading-enquiries">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    </div>
                  ) : filteredInquiries.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500" data-testid="empty-enquiries">
                      <MessageSquare className="h-16 w-16 mb-4 opacity-50" />
                      <p className="text-lg font-medium">No enquiries yet</p>
                      <p className="text-sm">
                        {platform.id === 'all' 
                          ? 'Submissions will appear here once users fill out your forms' 
                          : `No submissions from ${platform.label} page yet`}
                      </p>
                    </div>
                  ) : (
                    <InquiriesTable inquiries={filteredInquiries} />
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={deleteInquiryId !== null} onOpenChange={(open) => !open && setDeleteInquiryId(null)}>
        <AlertDialogContent data-testid="dialog-delete-confirm">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Inquiry</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this inquiry? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteInquiryId && deleteInquiryMutation.mutate(deleteInquiryId)}
              className="bg-red-500 hover:bg-red-600"
              data-testid="button-confirm-delete"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
