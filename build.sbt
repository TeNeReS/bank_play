name := "bank_play"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava, PlayEbean)

scalaVersion := "2.12.4"

crossScalaVersions := Seq("2.11.12", "2.12.4")

libraryDependencies += guice
libraryDependencies += "org.postgresql" % "postgresql" % "42.0.0"
libraryDependencies += "org.projectlombok" % "lombok" % "1.16.18"