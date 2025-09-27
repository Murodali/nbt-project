import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button, Card, CardBody, Input, Link } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "../hooks";
import { loginSchema, type LoginFormData } from "../model";

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
      phone: "+992 993300111",
      password: "",
    },
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = (data: LoginFormData) => {
    loginMutation.mutate(data, {
      onError: (error: any) => {
        // Handle different error types
        if (error.response?.status === 401) {
          setError("root", {
            type: "manual",
            message: "Неверный номер телефона или пароль",
          });
        } else if (error.response?.status === 429) {
          setError("root", {
            type: "manual",
            message: "Слишком много попыток. Попробуйте позже",
          });
        } else {
          setError("root", {
            type: "manual",
            message: "Произошла ошибка. Попробуйте позже",
          });
        }
      },
    });
  };

  return (
    <Card className="w-full max-w-md bg-card shadow-lg">
      <CardBody className="p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Авторизация</h1>
          <p className="text-muted-foreground text-sm">Войдите в учетную запись</p>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          {errors.root && (
            <div className="text-red-500 text-sm text-center">
              {errors.root.message}
            </div>
          )}
          <div>
            <Input
              {...register("phone")}
              type="tel"
              label="Номер телефона"
              placeholder="Номер телефона"
              color="default"
              variant="flat"
              isInvalid={!!errors.phone}
              errorMessage={errors.phone?.message}
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
