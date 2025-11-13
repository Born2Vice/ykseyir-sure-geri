import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

const CountdownTimer = () => {
  // YKS exam date - June 14, 2025, 10:15 (Turkey time)
  // Using Date constructor with parameters to avoid timezone parsing issues
  const targetDate = new Date(2025, 5, 14, 10, 15, 0).getTime(); // Month is 0-indexed (5 = June)

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      total: difference,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const totalDays = Math.floor((targetDate - new Date(2024, 5, 14, 10, 15, 0).getTime()) / (1000 * 60 * 60 * 24));
  const progress = ((totalDays - timeLeft.days) / totalDays) * 100;

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <Card className="bg-gradient-to-br from-card to-muted/30 backdrop-blur-sm border-2 shadow-lg min-w-[70px] sm:min-w-[90px] p-3 sm:p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <div className="text-3xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tabular-nums">
          {value.toString().padStart(2, "0")}
        </div>
      </Card>
      <span className="mt-3 text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
    </div>
  );

  if (timeLeft.total <= 0) {
    return (
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary animate-pulse">
          YKS Zamanı! 🎓
        </h2>
        <p className="mt-4 text-muted-foreground">Sınavınız başlamıştır. Başarılar dileriz!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-in fade-in slide-in-from-top duration-700">
          YKS'ye Hazırlık
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">Kalan Süre</p>
      </div>

      <div className="grid grid-cols-4 gap-3 sm:gap-6 justify-items-center animate-in fade-in slide-in-from-bottom duration-700 delay-150">
        <TimeUnit value={timeLeft.days} label="Gün" />
        <TimeUnit value={timeLeft.hours} label="Saat" />
        <TimeUnit value={timeLeft.minutes} label="Dakika" />
        <TimeUnit value={timeLeft.seconds} label="Saniye" />
      </div>

      <div className="space-y-3 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
        <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
          <span>İlerleme</span>
          <span>{progress.toFixed(1)}%</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full transition-all duration-500 shadow-md"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="text-center text-xs sm:text-sm text-muted-foreground animate-in fade-in duration-700 delay-500">
        <p>📅 Hedef Tarih: 14 Haziran 2025, 10:15</p>
      </div>
    </div>
  );
};

export default CountdownTimer;
