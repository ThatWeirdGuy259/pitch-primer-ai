import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StepCard } from "@/components/StepCard";
import { ArrowRight, Loader2, FileText, Download, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BusinessDraftStepProps {
  problem: string;
  businessQuestion: string;
  selectedIdea: string;
  businessDraft: string;
  isGenerating: boolean;
  onNext: () => void;
  onGenerate: () => void;
}

export const BusinessDraftStep = ({ 
  problem,
  businessQuestion,
  selectedIdea,
  businessDraft, 
  isGenerating, 
  onNext,
  onGenerate 
}: BusinessDraftStepProps) => {
  const { toast } = useToast();

  useEffect(() => {
    if (!businessDraft) {
      onGenerate();
    }
  }, [businessDraft, onGenerate]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(businessDraft);
      toast({
        title: "Copied to clipboard",
        description: "Business draft has been copied successfully",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please select and copy the text manually",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([businessDraft], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'business-draft.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded",
      description: "Business draft saved to your device",
    });
  };

  return (
    <StepCard>
      <div className="text-center mb-8">
        <FileText className="w-12 h-12 text-accent mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">
          Your Business Draft
        </h2>
        <p className="text-lg text-muted-foreground">
          Professional startup concept ready for investors and partners
        </p>
      </div>

      <div className="space-y-6">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="text-lg text-muted-foreground">
              Creating your business draft...
            </p>
            <p className="text-sm text-muted-foreground">
              Analyzing market fit and competitive positioning
            </p>
          </div>
        ) : businessDraft ? (
          <div className="space-y-6">
            <div className="bg-card rounded-lg border p-6 max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">
                {businessDraft}
              </pre>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleCopy}
                variant="outline"
                className="flex-1"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Draft
              </Button>
              <Button
                onClick={handleDownload}
                variant="outline"
                className="flex-1"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>

            <Button
              onClick={onNext}
              size="lg"
              className="w-full"
            >
              Get Action Steps
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        ) : null}
      </div>
    </StepCard>
  );
};