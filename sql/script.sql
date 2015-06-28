CREATE DATABASE IF NOT EXISTS mirrors;
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' identified by 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' identified by 'root';
FLUSH PRIVILEGES;

drop table IF EXISTS post_item;
create table post_item
(
        id 			BIGINT KEY NOT NULL AUTO_INCREMENT,
        author			VARCHAR(32),
        date			DATETIME,
        content			VARCHAR(8192) default ''
) ENGINE=InnoDB;

drop table IF EXISTS post_info;
create table post_info
(
        id 			BIGINT KEY NOT NULL AUTO_INCREMENT,
        title			VARCHAR(128),
        url			VARCHAR(128),
        last_url			VARCHAR(128),
        last_post			int,
        account      int,
        status   INT default 0
);
INSERT INTO post_info (id, title, url, last_url, last_post, account, STATUS) VALUES(1, 'Smith', 'http://bbs.tianya.cn/post-stocks-216255-1.shtml', 'http://bbs.tianya.cn/post-stocks-216255-1.shtml', 0, 0, 0);
