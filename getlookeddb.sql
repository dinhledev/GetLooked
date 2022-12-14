-- MySQL Script generated by MySQL Workbench
-- Thu Nov  3 17:16:33 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema getlookedDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema getlookedDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `getlookedDB` DEFAULT CHARACTER SET utf8 ;
USE `getlookedDB` ;

-- -----------------------------------------------------
-- Table `getlookedDB`.`user_account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `getlookedDB`.`user_account` (
  `account_id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(100) NULL,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `date_of_birth` VARCHAR(45) NULL,
  `height` DECIMAL NULL,
  `weight` DECIMAL NULL,
  `sport` VARCHAR(45) NULL,
  `position` VARCHAR(45) NULL,
  `about` MEDIUMTEXT NULL,
  `org_name` VARCHAR(45) NULL,
  `street_address` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `is_org` TINYINT(1) NULL,
  `acc_pic` VARCHAR(100) NULL,
   UNIQUE (email),
  PRIMARY KEY (`account_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `getlookedDB`.`user_post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `getlookedDB`.`user_post` (
  `post_id` INT NOT NULL AUTO_INCREMENT,
  `account_id` INT NOT NULL,
  `post_text` MEDIUMTEXT NULL,
  `created_datetime` DATETIME NULL,
  `post_pic` VARCHAR(200) NULL,
  PRIMARY KEY (`post_id`),
  INDEX `account_id_idx` (`account_id` ASC) VISIBLE,
  CONSTRAINT `account_id`
    FOREIGN KEY (`account_id`)
    REFERENCES `getlookedDB`.`user_account` (`account_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
