import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { login } from "./actions";
import Link from "next/link";

export default async function LOGIN({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const errorMessage = (await searchParams).error;

  console.log(errorMessage);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Card className="px-8 w-1/3">
        <CardTitle className="text-lg">Login</CardTitle>
        <CardDescription>
          Enter your email and password to login
        </CardDescription>
        ƒ{/* Display error message if it exists */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {errorMessage}
          </div>
        )}
        <form className="grid grid-cols-1 gap-5">
          <Label htmlFor="email">Email</Label>
          <Input
            required
            id="email"
            name="email"
            type="email"
            placeholder="johndoe@example.com"
          ></Input>

          <Label htmlFor="password">Password</Label>
          <Input required id="password" name="password" type="password"></Input>

          <Button className="w-full" formAction={login}>
            Login
          </Button>
          <div className="text-center">
            <p>
              Don&apost have an account?{" "}
              <Link className="font-medium underline" href="/register">
                Register
              </Link>{" "}
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
}
