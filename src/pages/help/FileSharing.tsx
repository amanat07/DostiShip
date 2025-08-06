import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Download, Shield, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const FileSharing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/help-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Help Center
            </Link>
          </Button>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-3xl">File Sharing</CardTitle>
              </div>
              <p className="text-muted-foreground text-lg">
                Learn how to share files safely with your friends on Dostiशिप
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Uploading Files
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Share documents, images, and other files with your study groups:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Click the attachment icon in any chat</li>
                    <li>Select files from your device (max 10MB per file)</li>
                    <li>Supported formats: PDF, DOC, JPG, PNG, MP3, MP4</li>
                    <li>Add a description to help others understand the content</li>
                    <li>Files are automatically scanned for safety</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Downloading Files
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Access shared files from your friends:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Click on any file shared in chat to preview</li>
                    <li>Use the download button to save to your device</li>
                    <li>Files are automatically organized in your downloads folder</li>
                    <li>Check file details before downloading</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Safety Guidelines
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Keep your files and device safe:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Only download files from trusted friends</li>
                    <li>Never share personal documents or passwords</li>
                    <li>Scan downloaded files with your antivirus</li>
                    <li>Report suspicious files immediately</li>
                    <li>Don't share copyrighted material</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  File Types & Limits
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Understanding file sharing restrictions:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Documents:</strong> PDF, DOC, DOCX, PPT, PPTX (up to 10MB)</li>
                    <li><strong>Images:</strong> JPG, PNG, GIF, WebP (up to 5MB)</li>
                    <li><strong>Audio:</strong> MP3, WAV, AAC (up to 20MB)</li>
                    <li><strong>Video:</strong> MP4, AVI, MOV (up to 50MB)</li>
                    <li><strong>Archives:</strong> ZIP, RAR (up to 25MB)</li>
                  </ul>
                </div>
              </section>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">💡 Pro Tips</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Compress large files before sharing</li>
                  <li>• Use descriptive filenames</li>
                  <li>• Organize files in study group folders</li>
                  <li>• Set expiration dates for sensitive files</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FileSharing;