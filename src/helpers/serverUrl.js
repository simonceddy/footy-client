import { SERVER_HOST, SERVER_PORT, SERVER_PROTOCOL } from '../consts';

export default function serverUrl() {
  return `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}`;
}
