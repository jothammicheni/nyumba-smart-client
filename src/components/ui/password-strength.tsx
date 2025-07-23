import { cn } from "../../lib/utils";

interface PasswordStrengthMeterProps {
  password: string;
  className?: string;
}

export function PasswordStrengthMeter({
  password,
  className,
}: PasswordStrengthMeterProps) {
  const calculateStrength = (password: string) => {
    if (!password) return 0;
    
    let strength = 0;
    // Length check
    if (password.length > 5) strength += 1;
    if (password.length > 8) strength += 1;
    // Complexity checks
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    return Math.min(strength, 5);
  };

  const strength = calculateStrength(password);
  const strengthPercent = (strength / 5) * 100;

  const getColor = () => {
    if (strength <= 2) return "bg-red-500";
    if (strength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor()} transition-all duration-300`}
          style={{ width: `${strengthPercent}%` }}
        />
      </div>
      <div className="text-xs text-muted-foreground mt-1">
        {strength === 0 && "Very weak"}
        {strength === 1 && "Weak"}
        {strength === 2 && "Fair"}
        {strength === 3 && "Good"}
        {strength >= 4 && "Strong"}
      </div>
    </div>
  );
}