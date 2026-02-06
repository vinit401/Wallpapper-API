import { ENV } from "../config/env";

export class PixabayService {

  static async fetchImages(searchQuery, pageNum = 1, perPage = ENV.PER_PAGE_INTIAL) {

    const url = `${ENV.PIXABAY_API_URL}?key=${ENV.PIXABAY_API_KEY}&q=${encodeURIComponent(
      searchQuery
    )}&image_type=photo&per_page=${perPage}&page=${pageNum}&safesearch=true`;

    const response = await fetch(url);   // 🔥 await added

    if (!response.ok) {
      throw new Error(`Error fetching images: ${response.statusText}`);
    }

    return await response.json();        // 🔥 await added
  }
}
