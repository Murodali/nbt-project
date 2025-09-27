import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { OtpForm } from "../../features/otp/ui/OtpForm";
import { ROUTES } from "../../shared/lib/constants/routes";

export const OtpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get phone from navigation state
  const phone = location.state?.phone;

  // Redirect to login if no phone is provided
  useEffect(() => {
    if (!phone) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [phone, navigate]);

  const handleBack = () => {
    navigate(ROUTES.LOGIN);
  };

  if (!phone) {
    console.log("No phone provided");
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <OtpForm phone={phone} onBack={handleBack} />
    </div>
  );
};
