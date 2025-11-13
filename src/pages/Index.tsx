import CountdownTimer from "@/components/CountdownTimer";
import { Button } from "@/components/ui/button";
import { Download, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Index = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      toast.info("Tarayıcınızdan Ana Ekrana Ekle seçeneğini kullanın", {
        description: "Safari: Paylaş > Ana Ekrana Ekle\nChrome: Menü > Ana Ekrana Ekle",
      });
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      toast.success("Uygulama yüklendi!", {
        description: "Artık ana ekranınızdan erişebilirsiniz.",
      });
    }

    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-5xl space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
              <span className="text-xl sm:text-2xl">📚</span>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">YKS Geri Sayım</h2>
          </div>
          
          {isInstallable && (
            <Button
              onClick={handleInstall}
              variant="default"
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg"
            >
              <Download className="w-4 h-4 mr-2" />
              Uygulamayı Yükle
            </Button>
          )}
        </div>

        <div className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-border/50 p-6 sm:p-10 md:p-12">
          <CountdownTimer />
        </div>

        <div className="bg-gradient-to-br from-muted/50 to-muted/30 backdrop-blur-sm rounded-2xl p-6 space-y-4 border border-border/50">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Uygulamayı Ana Ekrana Ekleyin</p>
              <ul className="space-y-1 list-disc list-inside">
                <li><strong>iPhone/iPad:</strong> Safari'de Paylaş → Ana Ekrana Ekle</li>
                <li><strong>Android:</strong> Chrome menüsünden Ana Ekrana Ekle</li>
              </ul>
              <p className="text-xs mt-3">
                Ana ekranınıza eklediğinizde, uygulama bir mobil uygulama gibi çalışır ve çevrimdışı erişim sağlar.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            💪 Her gün biraz daha yaklaşıyorsun!
          </p>
          <p className="text-xs text-muted-foreground/60">
            Başarılar dileriz 🎯
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
