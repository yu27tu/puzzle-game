package com.example.puzzlegame;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // 新規登録
    public User register(String username, String password) {

        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("そのユーザー名は既に使われています");
        }

        String hashedPassword = passwordEncoder.encode(password);

        User user = new User(username, hashedPassword);

        return userRepository.save(user);
    }

    // ログイン
    public User login(String username, String password) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("ユーザー名またはパスワードが違います")
                );

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("ユーザー名またはパスワードが違います");
        }

        return user;
    }
}
