<?php
// really simple "API" backed by file-based, serialized data

define('AUDIO_DIR', 'audio/');
define('TRACKS', 'tracks');

$db = new Database();

$request = explode('/', $_GET['request']);
switch ($request[0]) {
  case 'tracks':

    if ($handle = opendir(AUDIO_DIR)) {
      $songs = array();
      while (false !== ($item = readdir($handle))) {
        if (substr($item, -4) == ".mp3") {
          $songs[$item] = new Track($item);
        }
      }
      closedir($handle);

      usort($songs, 'alphaCmp');

      foreach ($songs as $index => $song) {
        $songs[$index]->order = $index;
      }

      print json_encode($songs);

      $db->store(TRACKS, $songs);
    }

    break;
  default:
    header("HTTP/1.0 404 Not Found");
    break;
}

// default sort for mixtape
function alphaCmp($a, $b) {
  return strcmp($a->src, $b->src);
}

class Database {

  private function createFilename($name) {
    return '.data.'.$name;
  }

  function store($name, $data) {
    file_put_contents($this->createFilename($name), '<?php $data = "'.base64_encode(serialize($data)).'";');
  }

  function retrieve($name) {
    $name = $this->createFilename($name);
    if (file_exists($name) && is_readable($name)) {
      include($name);
      return unserialize(base64_decode($data));
    }
  }

}

class Track {
  public $src;

  public function __construct($src = null) {
    if (!is_null($src)) {
      $this->src = AUDIO_DIR.$src;
    }
  }
}
