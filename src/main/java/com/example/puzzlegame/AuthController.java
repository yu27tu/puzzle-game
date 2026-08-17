package com.example.puzzlegame;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public Map<String, Object> login(
            @RequestBody Map<String, String> request) {

        String username = request.get("username");
        String password = request.get("password");

       if ("test".equals(username) && "1234".equals(password)) {
            return Map.of(
                    "success", true,
                    "username", username,
                    "message", "ログイン成功"
            );
        }

        return Map.of(
                "success", false,
                "message", "ユーザー名またはパスワードが違います"
        );
    }

    @PostMapping("/register")
    public Map<String, Object> register(
            @RequestBody Map<String, String> request) {

        return Map.of(
                "success", true,
                "message", "新規登録成功"
        );
    }
}