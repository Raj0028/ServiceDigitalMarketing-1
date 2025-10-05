import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { useEffect } from 'react';
import { Download, Mail, Phone, MapPin, MessageSquare, Calendar, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Inquiry } from '@shared/schema';
import { format } from 'date-fns';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export default function Admin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

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

  const inquiries = data?.inquiries || [];

  const downloadCSV = () => {
    if (inquiries.length === 0) return;

    const headers = ['Date', 'Name', 'Email', 'Phone', 'Country', 'Platform', 'Message'];
    const csvContent = [
      headers.join(','),
      ...inquiries.map(inq => [
        format(new Date(inq.createdAt), 'yyyy-MM-dd HH:mm:ss'),
        `"${inq.name}"`,
        inq.email,
        inq.phone,
        inq.country,
        inq.platform,
        `"${inq.message.replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `enquiries_${format(new Date(), 'yyyy-MM-dd_HHmmss')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
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
              <CardTitle data-testid="text-enquiries-count">Total Enquiries: {inquiries.length}</CardTitle>
              <CardDescription>All submissions from your landing pages</CardDescription>
            </div>
            <Button 
              onClick={downloadCSV} 
              disabled={inquiries.length === 0}
              data-testid="button-download-csv"
            >
              <Download className="mr-2 h-4 w-4" />
              Download CSV
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-64" data-testid="loading-enquiries">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            ) : inquiries.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500" data-testid="empty-enquiries">
                <MessageSquare className="h-16 w-16 mb-4 opacity-50" />
                <p className="text-lg font-medium">No enquiries yet</p>
                <p className="text-sm">Submissions will appear here once users fill out your forms</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead data-testid="header-date">Date</TableHead>
                      <TableHead data-testid="header-name">Name</TableHead>
                      <TableHead data-testid="header-contact">Contact</TableHead>
                      <TableHead data-testid="header-platform">Platform</TableHead>
                      <TableHead data-testid="header-message">Message</TableHead>
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
                        <TableCell data-testid={`platform-${inquiry.id}`}>
                          <Badge className={getPlatformColor(inquiry.platform)}>
                            {inquiry.platform.charAt(0).toUpperCase() + inquiry.platform.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-md" data-testid={`message-${inquiry.id}`}>
                          <p className="text-sm text-gray-700 line-clamp-2">{inquiry.message}</p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
