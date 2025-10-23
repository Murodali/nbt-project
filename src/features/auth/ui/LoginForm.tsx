import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button, Card, CardBody, Input, Link } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../shared/lib/constants/routes";
import { useLogin } from "../hooks/useLogin";
import { loginSchema, type LoginFormData } from "../model/loginSchema";

export const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();

  const handleLogin = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(data).then(() => {
        navigate(ROUTES.OTP, { replace: false });
      });
    } catch (error) {
      setError("root", {
        message: "Неверное имя пользователя или пароль",
      });
    }
  };

  return (
    <Card className="w-full max-w-md bg-card shadow-lg">
      <CardBody className="p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Авторизация
          </h1>
          <p className="text-muted-foreground text-sm">
            Войдите в учетную запись
          </p>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          {errors.root && (
            <div className="text-red-500 text-sm text-center">
              {errors.root.message}
            </div>
          )}
          <div>
            <Input
              {...register("username")}
              type="text"
              label="Имя пользователя"
              placeholder="Имя пользователя"
              color="default"
              variant="flat"
              isInvalid={!!errors.username}
              errorMessage={errors.username?.message}
            />
          </div>

          <div>
            <Input
              {...register("password")}
              label="Пароль"
              placeholder="Пароль"
              variant="flat"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashIcon className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <EyeIcon className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />
          </div>

          <div className="text-right">
            <Link
              href="#"
              className="text-blue-600 text-sm hover:text-blue-700"
            >
              Забыли пароль?
            </Link>
          </div>

          <Button
            type="submit"
            color="primary"
            size="lg"
            isLoading={loginMutation.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl"
          >
            {loginMutation.isPending ? "Вход..." : "Войти"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
