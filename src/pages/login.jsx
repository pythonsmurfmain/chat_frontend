import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (name.trim() === "") return;
    localStorage.setItem("username", name);
    navigate("/chat");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-rose-50 p-4">
      <Card className="w-full max-w-sm shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-bold text-center text-rose-600">Welcome</h2>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
          />
          <Button onClick={handleLogin} className="w-full">
            Enter Chat
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
