import { createContext, useContext, useState, useCallback } from 'react';
const Ctx = createContext(null);
export const useModal = () => useContext(Ctx);
export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);
  const open = useCallback((type, data = {}) => setModal({ type, data }), []);
  const close = useCallback(() => setModal(null), []);
  return <Ctx.Provider value={{ modal, open, close }}>{children}</Ctx.Provider>;
}
