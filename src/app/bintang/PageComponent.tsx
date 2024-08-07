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
import Bintang from "@/components/atoms/Bintang";
import GiftBox from "@/components/atoms/Gift_box";
import Envelope from "@/components/atoms/Envelope";
import Iphone from "@/components/atoms/Iphone";
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
        className="w-screen !h-[100dvh] top-0 left-0 bg-black bg-opacity-50 fixed z-[150]"
      ></motion.div>
      <motion.div
        initial={{ y: "100%", x: "-50%" }}
        animate={{ y: "-50%", x: "-50%" }}
        className="fixed left-1/2 bg-white text-black -translate-x-1/2 w-full md:w-[450px] lg:max-h-[50dvh] overflow-y-auto p-4 h-[100dvh] md:h-max top-1/2 -translate-y-1/2 flex flex-col gap-4 z-[200] rounded-md"
      >
        <button
          onClick={params.handleClose}
          className="relative ml-auto flex cursor-pointer items-center gap-2 font-bold z-[100]"
        >
          <Close /> Close
        </button>
        <p className="text-balance text-sm">
          Selamat merayakan hari lahir, Sayang! 🥳🥳
        </p>
        <p className="text-balance text-sm">
          26 tahun sudah kamu hidup di dunia dengan segala rasa pahit & manis yg
          kamu terima. Segala sesuatu yg terjadi di hidupmu itu sudah menjadi
          takdir yang Allah tetapkan untukmu, termasuk hadirnya aku ke dalam
          hidupmu. Aku tahu aku bukan orang yang pertama menyentuh, juga mengisi
          hatimu. Sebab, sebelumnya kamu sudah pernah jatuh cinta beberapa kali
          kepada laki-laki selain aku. Tapi, kamu berhasil meyakinkanku kalau yg
          terakhir akan menang dari yg pertama ataupun kedua. Terbukti jika
          cinta kita tidak habis di orang lama, kan?
        </p>
        <p className="text-balance text-sm">
          <b>Sayang,</b>
          <br />
          Semoga di hari lahirmu ini, kamu senantiasa diberi ketabahan dan
          kesabaran yang lebih dari sebelumnya. <br />
          Semoga kamu menjadi pribadi yg jauh lebih baik lagi dari diri kamu
          sebelumnya <br />
          Semoga kamu bisa meraih apa yang menjadi keinginanmu <br />
          Semoga kamu selalu dikelilingi orang-orang yang sayang & peduli sama
          kamu
        </p>
        <p className="text-balance text-sm">
          <b>Sayang,</b>
          <br />
          Kamu jauh lebih berharga dari yang kamu pikirkan. Oleh karena itu,
          mencintaimu adalah pekerjaan yang paling menyenangkan untukku
          <br />
          Terima kasih sudah menjadi Audi yang selalu ingin tumbuh
          <br />
          Terima kasih sudah menjadi Audi yang berani melawan kekhawatiran di
          kepalamu
          <br />
          Terima kasih sudah menjadi Audi yang mau menerimaku dengan segala
          kekurangan dan hal-hal sederhana yg kupunya.
        </p>
        <p className="text-balance text-sm">
          <b>Sayang,</b>
          <br />
          Boleh ya aku nemenin kamu untuk tahun depan dan seterusnya?
          <br />
          Semoga kita selalu saling membersamai dan melengkapi sampai maut
          memisahkan kita.
          <br />
          Terakhir, selamat ulang tahun buat pasanganku yg selalu aku semogakan
          menjadi istri dan ibu dari anak-anakku kelak, aku sayang kamu! 💞💞
        </p>
        <br />
        <p className="text-balance text-sm">Dari yg mencintaimu,</p>
        <br />
        <p className="text-balance text-sm">Bintang Chandra Bayudana</p>
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

  // useEffect(() => {
  //   timer == 5 && params.handleClose();
  // }, [timer]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-screen !h-[100dvh] top-0 left-0 bg-black bg-opacity-50 fixed z-[150]"
      ></motion.div>

      <motion.div
        initial={{ y: "100%", x: "-50%" }}
        animate={{ y: "-50%", x: "-50%" }}
        className={`fixed left-1/2 ${
          timer >= 5 ? "" : "bg-white"
        } text-black -translate-x-1/2 w-full md:w-[450px] p-4 h-[100dvh] md:h-max top-1/2 -translate-y-1/2 flex flex-col gap-4 z-[200] rounded-md`}
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
            timer >= 5 && (
              <div className="font-bold text-lg">
                <img
                  className="h-64 w-full object-contain object-bottom rounded-lg shadow-lg"
                  src="https://hallmark.brightspotcdn.com/c2/58/31923b274f05a812741527f370e7/digi23-asafariromance-landscape-772x570.jpg"
                  alt=""
                />

                <div className="relative px-4 -mt-16">
                  <div className="p-6 bg-white rounded shadow-xl overflow-y-auto max-h-[55vh] max-h-[55dvh]">
                    <div className="flex items-baseline mx-auto">
                      <span className="inline-block bg-blue-200 mx-auto text-blue-800 text-xs px-2 rounded-full uppercase">
                        INVITATION CARD!
                      </span>
                    </div>
                    <h4 className="font-semibold text-md leading-tight my-2 ">
                      HAPPY BIRTHDAYY MY LOVELY BEAUTY HONEY BUNNY SWEETY
                      NATASYA AUDIA FEIRLY! ❤️❤️
                      <br />
                      <span className="text-xs">
                        YOU{"'"}RE INVITED TO TAMAN SAFARI TRIP WITH AYANG, ON:
                      </span>
                    </h4>
                    <div className="flex flex-col gap-2">
                      <div className="mt-2 text-sm">
                        DATE
                        <br />
                        <span className="text-gray-600 text-sm">
                          SUNDAY, 11TH AUGUST 2024
                        </span>
                      </div>
                      <div className="mt-2 text-sm">
                        TIME
                        <br />
                        <span className="text-gray-600 text-sm">
                          07.00 AM (STAND BY AT UR HOME)
                        </span>
                      </div>
                      <div className="mt-2 text-sm">
                        DRESSCODE
                        <br />
                        <span className="text-gray-600 text-sm">
                          BLACK & WHITE
                        </span>
                      </div>
                    </div>
                    <br />
                    <p className="font-bold">THANK U!</p>
                    <br />
                    <p className="font-bold">BEST REGARDS,</p>
                    <p className="font-bold">BINTANG 😘</p>
                  </div>
                </div>
              </div>
            )
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

const PrankContent = (params: { handleClose: () => void }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-screen !h-[100dvh] top-0 left-0 bg-black bg-opacity-50 fixed z-[150]"
      ></motion.div>

      <motion.div
        initial={{ y: "100%", x: "-50%" }}
        animate={{ y: "-50%", x: "-50%" }}
        className="fixed left-1/2 bg-white text-black -translate-x-1/2 w-full md:w-[450px] p-4 h-[100dvh] md:h-max top-1/2 -translate-y-1/2 flex flex-col gap-4 z-[200] rounded-md"
      >
        <button
          onClick={params.handleClose}
          className="relative ml-auto flex cursor-pointer items-center gap-2 font-bold z-[100]"
        >
          <Close /> Close
        </button>
        <video
          src="/video.mp4"
          autoPlay
          controls
          className="max-w-full max-h-[60dvh]"
        ></video>
      </motion.div>
    </>
  );
};

const Song = (params: { isPlaying: boolean }) => {
  const [volume, setVolume] = useState(1); // Volume state (1 is max, 0 is min)
  const audioRef: any = useRef(null); // Reference to the audio element

  const handleVolumeChange = () => {
    const newVolume = params.isPlaying ? 1 : 0.1;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  useEffect(() => {
    handleVolumeChange();
  }, [params.isPlaying]);

  return <audio ref={audioRef} hidden src="/song.mp3" autoPlay={true}></audio>;
};

const PageComponent = () => {
  // const gltf = useLoader(
  //   GLTFLoader,
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/Bintang.glb`,
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
  const [ready, setReady] = useState<boolean>(true);
  const [envelopeOpen, setEnvelopeOpen] = useState<boolean>(false);
  const [giftOpen, setGiftOpen] = useState<boolean>(false);
  const [prankOpen, setPrankOpen] = useState<boolean>(false);
  const { isDarkMode } = useDarkMode();
  const [, params] = useRoute("/item/:id");
  const [location, setLocation] = useLocation();
  const [value, setValue] = useState({
    name: "",
    date: "",
  });

  const validateIdentity = () => {
    const validData = {
      name: "natasya audia feirly",
      date: "1998-08-07",
    };
    if (
      validData.date == value.date &&
      validData.name.toUpperCase() == value.name
    ) {
      setReady(true);
    } else {
      alert("Data Tidak Valid");
    }
  };

  return ready ? (
    <>
      <button
        className="absolute top-4 lg:top-8 left-4 lg:left-8 flex items-center gap-4 text-black z-[100] font-bold"
        onClick={() => setLocation("/bintang")}
      >
        {params ? <ChevronLeft /> : <Information />}
        {params ? " Back" : " Double click to enter portal"}
      </button>
      {ready && (
        <>
          <Song isPlaying={!prankOpen} />
          <Canvas
            camera={{ fov: 75, position: [0, 0, 20] }}
            className="!h-[100dvh] w-screen"
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
                count={5}
                scale={[20, 20, 10]}
                size={10}
                speed={1}
                color={"yellow"}
                castShadow
                receiveShadow
              />
              <Bintang />
              <GiftBox
                position={[-0.8, -0.33, -4, 2]}
                scale={[0.5, 0.5, 0.5]}
                onClick={() => setGiftOpen(true)}
              />
              <Iphone
                position={[-0.3, -0.33, -4, 2]}
                scale={[0.1, 0.1, 0.1]}
                onClick={() => setPrankOpen(true)}
              />
              <Envelope
                onClick={() => setEnvelopeOpen(true)}
                position={[1, -0.33, -3.7]}
              />
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
        </>
      )}
      <AnimatePresence>
        {envelopeOpen && (
          <EnvelopeContent handleClose={() => setEnvelopeOpen(false)} />
        )}
        {giftOpen && <GiftContent handleClose={() => setGiftOpen(false)} />}
        {prankOpen && <PrankContent handleClose={() => setPrankOpen(false)} />}
      </AnimatePresence>
    </>
  ) : (
    <div className="!h-[100dvh] px-4 w-screen flex items-center bg-black justify-center">
      <div className="flex w-full md:w-[450px] flex-col gap-4">
        <div className="flex flex-col gap-2 text-white">
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
            className="focus:outline-none w-full h-[55px] border-2 rounded-md  text-black"
            placeholder="Masukan Nama"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="font-bold text-white">
            Tanggal Lahir
          </label>
          <input
            type="date"
            onChange={(e) =>
              setValue((prev) => ({ ...prev, date: e.target.value }))
            }
            className="focus:outline-none w-full h-[55px] border-2 rounded-md text-black"
            placeholder="Masukan Nama"
          />
        </div>
        <button
          className="w-full p-4 border-2  text-white border-white rounded-lg "
          onClick={() => validateIdentity()}
        >
          Masuk
        </button>
      </div>
    </div>
  );
};

export default PageComponent;
