import GameObject from '../GameObject'

export default interface Loader<T> {
  get(gameObject: GameObject): T | void
}
