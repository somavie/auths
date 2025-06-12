"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useCallback, useRef, useState } from "react";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const password2InputRef = useRef<HTMLInputElement>(null);
  const [formError, setFormError] = useState("");
  const handleRegistterClick = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const emailReg = new RegExp(
        "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
      );

      if (
        emailInputRef.current &&
        password2InputRef &&
        passwordInputRef.current
      ) {
        const email = emailInputRef.current.value;
        const pass1 = passwordInputRef.current.value;
        const pass2 = password2InputRef.current?.value;

        if (!emailReg.test(email)) {
          setFormError("Digite um Email Valido");
          return;
        }

        if (pass1.length < 8) {
          setFormError("A Senha precisa ter no minimo 8 caracteres");
          return;
        }
        if (pass1 != pass2) {
          setFormError("As Senhas precisa ser Identicas");
          return;
        }
      }
    },
    []
  );

  return (
    <form onSubmit={(event) => handleRegistterClick(event)}>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="w-full max-w-sm m-auto mt-5">
          <CardHeader>
            <CardTitle className="text-2xl">Cadastro</CardTitle>
            <CardDescription>
              Insira seus dados para se cadastrar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input ref={emailInputRef} id="email" type="email" required />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    ref={passwordInputRef}
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password2">Repita a Senha</Label>
                  </div>
                  <Input
                    id="password2"
                    type="password2"
                    ref={password2InputRef}
                    required
                  />
                </div>
                {formError && (
                  <div className="text-red-600">
                    <p className="text-sm font text-red-600">
                      Erro no Formulario
                    </p>
                    <p>{formError}</p>
                  </div>
                )}
                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full">
                    Cadastrar
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
