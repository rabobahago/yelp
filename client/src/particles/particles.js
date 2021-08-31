export const particlesOptions = {
  particles: {
    number: {
      value: 8,
      density: {
        enable: true,
        value_area: 80,
      },
    },
    line_linked: {
      enable: true,
    },
    move: {
      speed: 0.3,
      out_mode: "out",
    },
    shape: {
      type: ["image", "triangle"],
      image: [
        {
          src: "/react.cd2ab268.svg",
          height: 30,
          width: 23,
        },
        {
          src: "/k8s.2d579d24.svg",
          height: 20,
          width: 20,
        },
        {
          src: "/code.b3b4c4f4.png",
          height: 20,
          width: 20,
        },
      ],
    },
    color: {
      value: "#FF5733",
    },
    size: {
      value: 40,
      random: false,
      anim: {
        enable: true,
        speed: 1,
        size_min: 10,
        sync: true,
      },
    },
  },
  retina_detect: true,
};
