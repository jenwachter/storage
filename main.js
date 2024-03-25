class Storage {

  constructor(type) {
    this.storage = window[type];
    this.available = this.#isAvailable();
  }

  #isAvailable() {

    const key = 'local-storage-module-test';

    try {
      this.storage.setItem(key, 'test value');
      this.storage.removeItem(key);
      this.available = true;
    } catch (err) {
      this.available = false;
    }

    return this.available;
  }

  #getRaw(key) {
    if (this.available) {
      return this.storage.getItem(key);
    }
  }

  get(key) {
    if (!this.available) {
      return;
    }

    let data;

    try {
      const value = this.#getRaw(key);

      if (value === null) {
        return null;
      }

      data = JSON.parse(value);

      if (data === null) {
        return null;
      }
    } catch (e) {
      this.remove(key);
      return null;
    }

    // has it expired?
    if (data.expires && new Date() > new Date(data.expires)) {
      this.remove(key);
      return null;
    }

    return data.value;
  }

  set(key, value, options = {}) {
    if (!this.available) {
      return;
    }

    return this.storage.setItem(
      key,
      JSON.stringify({
        value,
        expires: options.expires,
      }),
    );
  }

  setIfNotExists(key, value, options = {}) {
    if (!this.available) {
      return;
    }

    if (this.storage.getItem(key) !== null) {
      return;
    }

    return this.storage.setItem(
      key,
      JSON.stringify({
        value,
        expires: options.expires,
      }),
    );
  }

  remove(key) {
    if (this.available) {
      return this.storage.removeItem(key);
    }
  }
}

export default Storage;
