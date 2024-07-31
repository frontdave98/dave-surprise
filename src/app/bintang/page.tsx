// @ts-nocheck
"use client";
import * as THREE from "three";
import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  Canvas,
  extend,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import {
  useCursor,
  MeshPortalMaterial,
  CameraControls,
  Gltf,
  Environment,
  Html,
  useProgress,
  Sparkles,
  Text,
} from "@react-three/drei";
import { easing, geometry } from "maath";
import { useRoute, useLocation } from "wouter";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import useDarkMode from "@/hooks/useDarkMode";
import { ChevronLeft, Close, Information } from "@carbon/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import Laras from "@/components/atoms/Laras";
import GiftBox from "@/components/atoms/Gift_box";
import Envelope from "@/components/atoms/Envelope";
extend(geometry);

const dLoader = new DRACOLoader();
dLoader.setDecoderPath(
  "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
);
dLoader.setDecoderConfig({ type: "js" });
function Frame({
  id,
  name,
  author,
  bg,
  width = 1,
  height = 1.61803398875,
  children,
  ...props
}: any) {
  const portal = useRef<any>();
  const [location, setLocation] = useLocation();
  const [, params] = useRoute("/item/:id");
  const [hovered, hover] = useState(false);
  useCursor(hovered);
  useFrame(
    (state, dt) =>
      easing! &&
      easing!.damp?.(
        portal?.current!,
        "blend",
        params?.id === id ? 1 : 0,
        0.2,
        dt
      )
  );
  return (
    <group {...props}>
      <mesh
        name={id}
        onDoubleClick={(e) => (
          e.stopPropagation(), setLocation("/item/" + e.object.name)
        )}
        onPointerOver={(e) => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <roundedPlaneGeometry args={[width, height, 0.1]} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <ambientLight intensity={2} />
        <React.Suspense fallback={<Loader />}>
          <MeshPortalMaterial
            ref={portal}
            events={params?.id === id}
            side={THREE.DoubleSide}
          >
            <color attach="background" args={[bg]} />
            {children}
          </MeshPortalMaterial>
        </React.Suspense>
      </mesh>
    </group>
  );
}

function Rig({
  position = new THREE.Vector3(0, 0, 2),
  focus = new THREE.Vector3(0, 0, 0),
}) {
  const { controls, scene }: any = useThree();
  const [, params] = useRoute("/item/:id");
  useEffect(() => {
    const active = scene.getObjectByName(params?.id!);
    if (active) {
      active?.parent?.localToWorld(position.set(0, 0.5, 0.25));
      active?.parent?.localToWorld(focus.set(0, 0, -2));
    }
    controls?.setLookAt!(...position.toArray(), ...focus.toArray(), true);
  });
  return (
    <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
  );
}
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <span className="text-black font-bold flex items-center gap-4">
        {progress} % loaded
      </span>
    </Html>
  );
}

const EnvelopeContent = (params: { handleClose: () => void }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-screen h-screen top-0 left-0 bg-black bg-opacity-50 fixed z-[150]"
      ></motion.div>
      <motion.div
        initial={{ y: "100%", x: "-50%" }}
        animate={{ y: "-50%", x: "-50%" }}
        className="fixed left-1/2 bg-white -translate-x-1/2 w-full md:w-[450px] p-4 h-[100dvh] md:h-max top-1/2 -translate-y-1/2 flex flex-col gap-4 z-[200] rounded-md"
      >
        <button
          onClick={params.handleClose}
          className="relative ml-auto flex cursor-pointer items-center gap-2 font-bold z-[100]"
        >
          <Close /> Close
        </button>
        <p>
          Haii pacarkuuu yang paling ku sayangg {':"('} I love youu so muchhhhh
          💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗!!!!
        </p>
        <p>Happy Birthday ya sayanggku !! {':"('}</p>
        <p>
          Di hari spesialmu ini, aku ingin mengucapkan selamat ulang tahun yang
          ke-27 dengan penuh cinta dan kebahagiaan. Kamu adalah orang yang
          paling istimewa dalam hidupku, dan setiap hari bersamamu terasa
          seperti sebuah petualangan yang luar biasa. Semoga di usia yang baru
          ini, semua impian dan harapanmu tercapai.
        </p>
        <p>
          Terima kasih telah menjadi sumber kebahagiaan dan inspirasi bagi aku.
          Aku beruntung memiliki kamu di sisiku, dan aku tidak sabar untuk
          melihat apa yang akan kita capai bersama di masa depan. Semoga tahun
          ini membawa banyak kebahagiaan, kesehatan, dan kesuksesan untukmu.
        </p>
        <p>
          Aku mencintaimu lebih dari kata-kata yang bisa menggambarkan. Selamat
          ulang tahun, cintaku! 🥳❤️
        </p>
      </motion.div>
    </>
  );
};

const GiftContent = (params: { handleClose: () => void }) => {
  const [start, setStart] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleCounter = () => {
    setInterval(() => {
      timer < 6 && setTimer((prev) => prev + 1);
    }, 1000);
  };

  const handleStartTimer = () => {
    setStart(true);
    setTimer((prev) => 1);
    handleCounter();
  };

  useEffect(() => {
    timer == 5 && params.handleClose();
  }, [timer]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-screen h-screen top-0 left-0 bg-black bg-opacity-50 fixed z-[150]"
      ></motion.div>

      <motion.div
        initial={{ y: "100%", x: "-50%" }}
        animate={{ y: "-50%", x: "-50%" }}
        className="fixed left-1/2 bg-white -translate-x-1/2 w-full md:w-[450px] p-4 h-[100dvh] md:h-max top-1/2 -translate-y-1/2 flex flex-col gap-4 z-[200] rounded-md"
      >
        <button
          onClick={params.handleClose}
          className="relative ml-auto flex cursor-pointer items-center gap-2 font-bold z-[100]"
        >
          <Close /> Close
        </button>
        <div className="flex flex-col gap-6 text-center">
          {timer && timer < 5 ? (
            <p className="font-black text-center text-4xl">{timer}</p>
          ) : null}
          {!start ? (
            <p className="font-bold text-lg">
              Tutup Mata ya! Kalo ngeliat nanti ga dapet kadonya!!! {":("}
            </p>
          ) : (
            timer >= 5 && <p className="font-bold text-lg">Coba Buka !</p>
          )}

          {timer == 0 && (
            <button
              className="w-full p-4 border-2 text-black border-black rounded-lg "
              onClick={handleStartTimer}
            >
              Mulai
            </button>
          )}
        </div>
      </motion.div>
    </>
  );
};

const BintangPage = () => {
  // const gltf = useLoader(
  //   GLTFLoader,
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/laras.glb`,
  //   (loader) => {
  //     loader.setDRACOLoader(dLoader);
  //     loader.setRequestHeader({ cache: "no-store" });
  //   }
  // );
  // const giftBox = useLoader(
  //   GLTFLoader,
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/gift_box.glb`,
  //   (loader) => {
  //     loader.setDRACOLoader(dLoader);
  //   }
  // );
  // const envelope = useLoader(
  //   GLTFLoader,
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/envelope.glb`,
  //   (loader) => {
  //     loader.setDRACOLoader(dLoader);
  //   }
  // );
  const [ready, setReady] = useState<boolean>(false);
  const [envelopeOpen, setEnvelopeOpen] = useState<boolean>(false);
  const [giftOpen, setGiftOpen] = useState<boolean>(false);
  const { isDarkMode } = useDarkMode();
  const [, params] = useRoute("/item/:id");
  const [location, setLocation] = useLocation();
  const [value, setValue] = useState({
    name: "",
    date: "",
  });

  const validateIdentity = () => {
    const validData = {
      name: "PUTRI LARASATI",
      date: "1997-06-24",
    };
    console.log(value);
    if (validData.date == value.date && validData.name == value.name) {
      setReady(true);
    } else {
      alert("Data Tidak Valid");
    }
  };

  return ready ? (
    <>
      <button
        className="absolute top-28 left-4 lg:left-8 flex items-center gap-4 text-black dark:text-white z-[100] font-bold"
        onClick={() => setLocation("/labs/hbd-my-gf")}
      >
        {params ? <ChevronLeft /> : <Information />}{" "}
        {params ? " Back" : " Double click to enter portal"}
      </button>
      {ready && (
        <Canvas
          camera={{ fov: 75, position: [0, 0, 20] }}
          className="h-screen w-screen"
          eventPrefix="client"
        >
          <color attach="background" args={["#ffc8dd"]} />
          <directionalLight position={[3.3, 1.0, 4.4]} intensity={4} />
          <ambientLight intensity={10} />
          <Frame id="02" name="tea" author="Omar Faruq Tawsif">
            <Environment preset="forest" />
            <color
              attach="background"
              args={[isDarkMode ? "#dadada" : "#f0f0f0"]}
            />
            <Sparkles
              count={1000}
              scale={[20, 20, 10]}
              size={10}
              speed={1}
              color={"white"}
              castShadow
              receiveShadow
            />
            <Laras />
            <GiftBox onClick={() => setGiftOpen(true)} />
            <Envelope onClick={() => setEnvelopeOpen(true)} />
            {/* <primitive
              onClick={() => setGiftOpen(true)}
              object={giftBox.scene}
              position={[1.3, -2.3, -9.5]}
              dispose={null}
            />
            <primitive
              onClick={() => setEnvelopeOpen(true)}
              object={envelope.scene}
              position={[-1, -1.3, -6.5]}
              dispose={null}
            /> */}
          </Frame>
          <Rig />
        </Canvas>
      )}
      <AnimatePresence>
        {envelopeOpen && (
          <EnvelopeContent handleClose={() => setEnvelopeOpen(false)} />
        )}
        {giftOpen && <GiftContent handleClose={() => setGiftOpen(false)} />}
      </AnimatePresence>
    </>
  ) : (
    <div className="h-screen px-4 w-screen flex items-center bg-white dark:bg-black justify-center">
      <div className="flex w-full md:w-[450px] flex-col gap-4">
        <div className="flex flex-col gap-2 dark:text-white">
          <label htmlFor="" className="font-bold ">
            Nama
          </label>
          <input
            type="text"
            onChange={(e) =>
              setValue((prev) => ({
                ...prev,
                name: e.target.value.toUpperCase(),
              }))
            }
            className="focus:outline-none w-full h-[55px] border-2 rounded-md  dark:text-black"
            placeholder="Masukan Nama"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="font-bold dark:text-white">
            Tanggal Lahir
          </label>
          <input
            type="date"
            onChange={(e) =>
              setValue((prev) => ({ ...prev, date: e.target.value }))
            }
            className="focus:outline-none w-full h-[55px] border-2 rounded-md dark:text-black"
            placeholder="Masukan Nama"
          />
        </div>
        <button
          className="w-full p-4 border-2 text-black dark:text-white border-black dark:border-white rounded-lg "
          onClick={() => validateIdentity()}
        >
          Masuk
        </button>
      </div>
    </div>
  );
};

export default BintangPage;
