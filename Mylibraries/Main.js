var _betaMode = false;
var geometry = new THREE.Geometry();
var pickingGeometry = new THREE.Geometry();
var pickingMaterial =
        new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors}),
    defaultMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      flatShading: true,
      vertexColors: THREE.VertexColors,
      shininess: 0
    });

var pickingData = [];
var pickingScene;
var matrix = new THREE.Matrix4();
var drawnObject;
var scene;
var teste = [];

function betaMode(_betaMode, tableData) {
  if (tableData.length > 1) tableData.shift();

  for (i = 0; i < tableData.length; i++) {
    tableData[i].shift();
    tableData[i].shift();
  }

  console.log('THe table Data: ');
  console.log(tableData);

  if (_betaMode) {
    noLoop();
    var container, stats;
    var camera, controls, renderer;
    var pickingTexture;

    var highlightBox;
    var mouse = new THREE.Vector2();
    var offset = new THREE.Vector3(10, 10, 10);
    init();
    animate();

    function init() {
      container = document.getElementById('container');
      camera = new THREE.PerspectiveCamera(
          70, window.innerWidth / window.innerHeight, 1, 1000000000000000);
      camera.position.z = 1000;
      controls = new THREE.TrackballControls(camera);
      controls.rotateSpeed = 1.0;
      controls.zoomSpeed = 1.2;
      controls.panSpeed = 1.2;
      controls.noZoom = false;
      controls.noPan = false;
      controls.staticMoving = false;
      controls.dynamicDampingFactor = 0.3;
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);
      pickingScene = new THREE.Scene();
      pickingTexture =
          new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
      pickingTexture.texture.minFilter = THREE.LinearFilter;
      scene.add(new THREE.AmbientLight(0xffffff));



      var geom = new THREE.BoxGeometry(2, 2, 2);
      var color = new THREE.Color();

      var quaternion = new THREE.Quaternion();

      c = 0;
      d = 0;
      var network = [];
      var tam = parseInt(dataSource.sizeSOM * dataSource.sizeSOM);
      console.log('tam : ' + tam);
      distânciaEntreNodes = 350;
      for (var i = 0; i < tam; i++) {
        network[i] = new Node();
        network[i].information = tableData[i];
        var position = new THREE.Vector3();
        position.x = i + c - tam;
        position.y = 0;
        position.z = i + d - tam;
        var rotation = new THREE.Euler();
        rotation.x = 0;
        rotation.y = 0;
        rotation.z = 0;
        var scale = new THREE.Vector3();
        scale.x = network[i].information[3] * 100 ;
        scale.y = 100;  //+ tables[1][i].norm() * 150;
        scale.z = network[i].information[3] * 100 ;
        var initColor = new THREE.Color();
        initColor.setRGB(
            network[i].information[0], network[i].information[1],
            network[i].information[2]);
        quaternion.setFromEuler(rotation, true);
        matrix.compose(position, quaternion, scale);
        geometry.merge(geom, matrix);


        // give the geom's vertices a SOM color, to be displayed
        if (i == 0) console.log(geom);

        applyVertexColors(geom, initColor);
        teste[i] = geom;
        geometry.merge(geom, matrix);

        if (i == 0) console.log(geometry);

        // give the geom's vertices a color corresponding to the "id"
        // applyVertexColors(geom, color.setHex(i));
        pickingGeometry.merge(geom, matrix);
        pickingData[i] =
            {position: position, rotation: rotation, scale: scale, geom: geom};
        c += distânciaEntreNodes;
        if (c == distânciaEntreNodes * dataSource.sizeSOM) {
          d += distânciaEntreNodes;
          c = 0;
        }

      }  // termina o laço for

      drawnObject = new THREE.Mesh(geometry, defaultMaterial);
      scene.add(drawnObject);
      pickingScene.add(new THREE.Mesh(pickingGeometry, pickingMaterial));
      highlightBox = new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.MeshLambertMaterial({color: 0xffff00}));
      scene.add(highlightBox);
      renderer = new THREE.WebGLRenderer({antialias: true});
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);
      stats = new Stats();
      container.appendChild(stats.dom);
      renderer.domElement.addEventListener('mousemove', onMouseMove);
    }

    function onMouseMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function animate() {
      requestAnimationFrame(animate);
      render();
      stats.update();
    }

    function pick() {
      // render the picking scene off-screen
      renderer.render(pickingScene, camera, pickingTexture);
      // create buffer for reading single pixel
      var pixelBuffer = new Uint8Array(4);
      // read the pixel under the mouse from the texture
      renderer.readRenderTargetPixels(
          pickingTexture, mouse.x, pickingTexture.height - mouse.y, 1, 1,
          pixelBuffer);
      // interpret the pixel as an ID
      var id =
          (pixelBuffer[0] << 16) | (pixelBuffer[1] << 8) | (pixelBuffer[2]);
      var data = pickingData[id];
      if (data) {
        // move our highlightBox so that it surrounds the picked object
        if (data.position && data.rotation && data.scale) {
          highlightBox.position.copy(data.position);
          highlightBox.rotation.copy(data.rotation);
          highlightBox.scale.copy(data.scale).add(offset);
          highlightBox.visible = true;
        }
      } else {
        highlightBox.visible = false;
      }
    }

    function render() {
      controls.update();
      pick();
      renderer.render(scene, camera);
    }



  } else
    return;
}

function draw() {
  frameRate(30);



  if (ready.status && !ready.toPrint)
    ready.setup();

  else if (ready.countFrame >= dataSource.snapshotNumber) {
    // Som.start();
    ready.andEnded();
  } else if (ready.status && ready.toPrint)
    ready.andPrinting();
  else if (!ready.status && !ready.tables && !ready.toPrint) {
  }
}



function applyVertexColors(g, c) {
  g.faces.forEach(function(f) {
    var n = (f instanceof THREE.Face3) ? 3 : 4;
    for (var j = 0; j < n; j++) {
      f.vertexColors[j] = c;
    }
  });
}




function teste( geom, cor){
  
}