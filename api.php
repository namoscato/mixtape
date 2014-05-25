<?php
// really simple "API" backed by a file-based, serialized data

define('AUDIO_DIR', 'audio/');

class Track {
  //public $name;
  public $src;

  public function __construct($src = null) {
    if (!is_null($src)) {
      $this->src = $src;
    }
  }
}

$request = explode('/', $_GET['request']);
switch ($request[0]) {
  case 'listDirectory':

    if ($handle = opendir(AUDIO_DIR)) {
      $songs = array();
      while (false !== ($item = readdir($handle))) {
        if (substr($item, -4) == ".mp3") {
          array_push($songs, new Track(AUDIO_DIR.$item));
        }
      }
      closedir($handle);
      print json_encode($songs);
    }

    break;
  default:
    // do nothing
    break;
}

