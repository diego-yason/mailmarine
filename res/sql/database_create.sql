CREATE TABLE `users` (
  `userid` bigint UNIQUE,
  `localid` int PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE `servers` (
  `serverid` bigint UNIQUE,
  `localid` int PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE `userbans` (
  `id` int PRIMARY KEY
);

CREATE TABLE `serverbans` (
  `id` int PRIMARY KEY
);

CREATE TABLE `origin_message` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `messageid` bigint UNIQUE NOT NULL,
  `server_origin` int NOT NULL,
  `author` int NOT NULL
);

CREATE TABLE `replicated_message` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `originId` int NOT NULL,
  `server` int NOT NULL
);

ALTER TABLE `replicated_message` ADD FOREIGN KEY (`originId`) REFERENCES `origin_message` (`id`);

ALTER TABLE `replicated_message` ADD FOREIGN KEY (`server`) REFERENCES `servers` (`localid`);

ALTER TABLE `userbans` ADD FOREIGN KEY (`id`) REFERENCES `users` (`localid`);

ALTER TABLE `origin_message` ADD FOREIGN KEY (`author`) REFERENCES `users` (`localid`);

ALTER TABLE `serverbans` ADD FOREIGN KEY (`id`) REFERENCES `servers` (`localid`);

ALTER TABLE `origin_message` ADD FOREIGN KEY (`server_origin`) REFERENCES `servers` (`localid`);

CREATE INDEX `all_message_ids` ON `replicated_message` (`originId`);