INSERT INTO User (id, display_name, email, password, is_vip) VALUES (1, "ADMIN", "admin@admin.com", "YWRtaW5hZG1pbg==", true);
INSERT INTO User (id, display_name, email, password, is_vip) VALUES (2, "USER", "user@demo.com", "dXNlcnVzZXI=", false);
INSERT INTO `subscription` (`end_date`, `id`, `start_date`, `user_id`) VALUES ('2024-07-09 16:18:47.000000', NULL, '2024-04-07 16:18:47.000000', '1');