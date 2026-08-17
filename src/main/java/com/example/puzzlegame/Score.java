package com.example.puzzlegame;

import jakarta.persistence.*;

@Entity
@Table(name = "scores")
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private Integer timeSeconds;

    @Column(nullable = false)
    private Integer moves;

    public Score() {
    }

    public Score(String username, Integer timeSeconds, Integer moves) {
        this.username = username;
        this.timeSeconds = timeSeconds;
        this.moves = moves;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public Integer getTimeSeconds() {
        return timeSeconds;
    }

    public Integer getMoves() {
        return moves;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setTimeSeconds(Integer timeSeconds) {
        this.timeSeconds = timeSeconds;
    }

    public void setMoves(Integer moves) {
        this.moves = moves;
    }
}

