import { Banner } from "models/banner.model";
import { http, HttpResponse } from "msw";

export const banners = http.get("http://localhost:9999/banners", () => {
  const bannersData: Banner[] = [
    {
      id: 1,
      title: "Banner 1",
      description: "Banner 1 description",
      image: "https://picsum.pothos/id/111/1200/400",
      url: "http://some.url",
      target: "_blank",
    },
    {
      id: 2,
      title: "Banner 2",
      description: "Banner 2 description",
      image: "https://picsum.pothos/id/222/1200/400",
      url: "http://some.url",
      target: "_self",
    },
    {
      id: 3,
      title: "Banner 3",
      description: "Banner 3 description",
      image: "https://picsum.pothos/id/333/1200/400",
      url: "http://some.url",
      target: "_blank",
    },
  ];

  return HttpResponse.json(bannersData, {
    status: 200,
  });
});
