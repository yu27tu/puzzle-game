package com.example.puzzlegame;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

@RestController
public class ScoreController {

    // スコアを一時的に保存する場所
    private final List<Map<String, Object>> scores = new ArrayList<>();


    // =========================
    // スコア保存
    // =========================

    @PostMapping("/api/score")
    public Map<String, Object> saveScore(
            @RequestBody Map<String, Object> request) {

        Object time = request.get("timeSeconds");
        Object moves = request.get("moves");

        // 今はログインユーザーを test として保存
        Map<String, Object> score = Map.of(
                "username", "test",
                "timeSeconds", time,
                "moves", moves
        );

        scores.add(score);

        return Map.of(
                "success", true,
                "message", "スコアを保存しました"
        );
    }


    // =========================
    // ランキング取得
    // =========================

    @GetMapping("/api/scores")
    public List<Map<String, Object>> getScores() {

        List<Map<String, Object>> ranking =
                new ArrayList<>(scores);

        // 時間が短い順
        ranking.sort(
                Comparator.comparingInt(
                        score -> ((Number) score.get("timeSeconds")).intValue()
                )
        );

        return ranking;
    }
}