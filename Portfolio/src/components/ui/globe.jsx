"use client";

import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";    // color = color representation, scene = container for all 3D objects, fog = fog effect, perspectivecamera = camera with perspective projection, vector3 = 3D vector representation 
import ThreeGlobe from "three-globe";                                     // for rendering 3D globe visualizations      
import { useThree, Canvas, extend } from "@react-three/fiber";            // render 3d graphics, useThree = hook to access threejs context, canvas = main container for 3D content, extend = extend threejs with custom objects
import { OrbitControls } from "@react-three/drei";                        // camera controls for orbiting around the globe                

import countries from "../../data/globe.json";

// registering ThreeGlobe as a custom JSX element for react-three-fiber
extend({ ThreeGlobe: ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;   // speed at which rings propagate
const ASPECT = 1;                   // aspect ratio for the browser window to maintain the globe's position and scale
const CAMERA_Z = 300;               // initial z position of the camera

// globe component to initialize the rendering of the globe by getting the data 
export function Globe({
  globeConfig,
  data = []
}) {
  const globeRef = useRef(null);  // reference to the ThreeGlobe instance
  const groupRef = useRef();      // reference to the group containing the globe

  const [isInitialized, setIsInitialized] = useState(false);  // state to track if the globe has been initialized

  // clone the config to avoid errors when accessing undefined properties
  const defaultProps = {
    ...globeConfig,
  };

  // Initialize globe only once the page is loaded
  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      globeRef.current = new ThreeGlobe();
      (groupRef.current).add(globeRef.current);
      setIsInitialized(true);
    }
  }, []);

  // Build material when globe is initialized or when relevant props change
  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;

    const globeMaterial = globeRef.current.globeMaterial();
    globeMaterial.color = new Color(globeConfig.globeColor);
    globeMaterial.emissive = new Color(globeConfig.emissive);
    globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
    globeMaterial.shininess = globeConfig.shininess || 0.9;
  }, [
    isInitialized,
    globeConfig.globeColor,
    globeConfig.emissive,
    globeConfig.emissiveIntensity,
    globeConfig.shininess,
  ]);

  // Configure all data-driven visual elements: !important
  // - Hex polygons for countries
  // - Arcs for data connections
  // - Points for endpoints
  // - Rings for animated highlights
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    const arcs = data;
    let points = [];
    // generating points from arc endpoints
    for (const arc of arcs) {
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.startLat,
        lng: arc.startLng,
      },{
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.endLat,
        lng: arc.endLng,
      });
    }



    // removing duplicates for same lat and lng
    const filteredPoints = points.filter((v, i, a) =>
      a.findIndex((v2) => v2.lat === v.lat && v2.lng === v.lng) === i
    );
    // setting up hex polygons (base map)
    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(defaultProps.showAtmosphere)
      .atmosphereColor(defaultProps.atmosphereColor)
      .atmosphereAltitude(defaultProps.atmosphereAltitude)
      .hexPolygonColor(() => defaultProps.polygonColor);

    // setting up arcs for data connections
    globeRef.current
      .arcsData(data)
      .arcStartLat((d) => (d).startLat * 1)
      .arcStartLng((d) => (d).startLng * 1)
      .arcEndLat((d) => (d).endLat * 1)
      .arcEndLng((d) => (d).endLng * 1)
      .arcColor((e) => (e).color)
      .arcAltitude((e) => (e).arcAlt * 1)
      .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
      .arcDashLength(defaultProps.arcLength)
      .arcDashInitialGap((e) => (e).order * 1)
      .arcDashGap(15)
      .arcDashAnimateTime(() => defaultProps.arcTime);

    // setting up points for arc endpoints
    globeRef.current
      .pointsData(filteredPoints)
      .pointColor((e) => (e).color)
      .pointsMerge(true)
      .pointAltitude(0)
      .pointRadius(2);
      
    // setting up rings for animated highlights
    globeRef.current
      .ringsData([])
      .ringColor(() => defaultProps.polygonColor)
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod((defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings);
  }, [
    isInitialized,
    data,
    defaultProps.pointSize,
    defaultProps.showAtmosphere,
    defaultProps.atmosphereColor,
    defaultProps.atmosphereAltitude,
    defaultProps.polygonColor,
    defaultProps.arcLength,
    defaultProps.arcTime,
    defaultProps.rings,
    defaultProps.maxRings,
  ]);

  return <group ref={groupRef} />;
}

// WebGL renderer configuration to set pixel ratio, size, and clear color
export function WebGLRendererConfig() {
  const { gl, size } = useThree();
 
  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(size.width, size.height);
    gl.setClearColor(0xffaaff, 0);
  }, []);
 
  return null;
}

/* Main World component to set up the scene, camera, lights, and controls */
export function World(props) {
  const { globeConfig } = props;
  const scene = new Scene();
  scene.fog = new Fog(0xffffff, 400, 2000);
  const groupRef = useRef();

  return (
    <Canvas scene={scene} camera={new PerspectiveCamera(60, ASPECT, 180, 1800)}>
      {/* pre-render 3d globe */}
      <WebGLRendererConfig />
      {/* set up lighting for the globe */}
      <ambientLight color={globeConfig.ambientLight} />
      <directionalLight
        color={globeConfig.directionalLeftLight}
        />
      <directionalLight
        color={globeConfig.directionalTopLight}
        />
      <pointLight
        color={globeConfig.pointLight}
      />
      
      {/* Initialize globe */}
      <group ref={groupRef}>
        <Globe {...props} />
      </group>
      
      {/* orbit controls for globe */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        minDistance={CAMERA_Z}
        maxDistance={CAMERA_Z}
        autoRotateSpeed={2}
        autoRotate={true}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3} />
    </Canvas>
  );
}

/* Property type defintions for Globe and World components */
Globe.propTypes = {
  globeConfig: PropTypes.shape({
    pointSize: PropTypes.number,
    atmosphereColor: PropTypes.string,
    showAtmosphere: PropTypes.bool,
    atmosphereAltitude: PropTypes.number,
    polygonColor: PropTypes.string,
    globeColor: PropTypes.string,
    emissive: PropTypes.string,
    emissiveIntensity: PropTypes.number,
    shininess: PropTypes.number,
    arcTime: PropTypes.number,
    arcLength: PropTypes.number,
    ambientLight: PropTypes.string,
    directionalLeftLight: PropTypes.string,
    directionalTopLight: PropTypes.string,
    pointLight: PropTypes.string,
    rings: PropTypes.number,
    maxRings: PropTypes.number,
    initialPosition: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
    autoRotate: PropTypes.bool,
    autoRotateSpeed: PropTypes.number,
  }),
  data: PropTypes.arrayOf(PropTypes.shape({
    startLat: PropTypes.number,
    startLng: PropTypes.number,
    endLat: PropTypes.number,
    endLng: PropTypes.number,
  }))
};


Globe.defaultProps = {
  globeConfig: {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#ffffff",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
  },
  data: [],
}

World.propTypes = {
  globeConfig: PropTypes.object,
  data: PropTypes.array,
}

export default World;
