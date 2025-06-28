
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, FileText, Image } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface FileUploadProps {
  bucket: string;
  onUploadComplete?: (url: string, fileName: string) => void;
  acceptedTypes?: string;
  maxSize?: number; // in MB
}

const FileUpload = ({ 
  bucket, 
  onUploadComplete, 
  acceptedTypes = "image/*", 
  maxSize = 5 
}: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; url: string }>>([]);
  const { toast } = useToast();
  const { user } = useAuth();

  const uploadFile = async (file: File) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to upload files.",
        variant: "destructive"
      });
      return;
    }

    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: `File size must be less than ${maxSize}MB.`,
        variant: "destructive"
      });
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      const newFile = { name: file.name, url: publicUrl };
      setUploadedFiles(prev => [...prev, newFile]);
      
      if (onUploadComplete) {
        onUploadComplete(publicUrl, file.name);
      }

      toast({
        title: "Upload Successful",
        description: "Your file has been uploaded successfully.",
      });
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              Drag and drop files here, or click to select files
            </p>
            <input
              type="file"
              accept={acceptedTypes}
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
              disabled={uploading}
            />
            <Button
              onClick={() => document.getElementById('file-upload')?.click()}
              disabled={uploading}
              className="bg-wynGreen-500 hover:bg-wynGreen-600"
            >
              {uploading ? 'Uploading...' : 'Select Files'}
            </Button>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Uploaded Files:</h4>
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {file.url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                      <Image className="w-5 h-5 text-wynGreen-500" />
                    ) : (
                      <FileText className="w-5 h-5 text-wynGreen-500" />
                    )}
                    <span className="text-sm text-gray-700">{file.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
