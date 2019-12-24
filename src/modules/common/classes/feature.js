import { foldTo } from 'fractal-objects';

export class Feature {
  /**
   * Constructs feature module representation, that folds all the feature modules
   * into a single module represented by this instance.
   *
   * @param modules feature modules
   */
  constructor(...modules) {
    foldTo(this, modules);
  }

  async createApp(entryModule) {
    if (this.onAppCreate) {
      for (const callback of this.onAppCreate) {
        await callback(this, entryModule);
      }
    }
  }
}
