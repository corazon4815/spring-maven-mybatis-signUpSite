package org.example.controller;

import java.sql.*;

public class DriverTest {

    public static void main(String args[]) {

        Connection conn;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver").newInstance();
            conn = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3307/memberdatabase?serverTimezone=Asia/Seoul", "root", "root");
            System.out.println("Success!");
        } catch (SQLException ex) {
            System.out.println("SQLException:" + ex);
        } catch (Exception e) {
            System.out.println("Exception:" + e);
        }
    }
}

