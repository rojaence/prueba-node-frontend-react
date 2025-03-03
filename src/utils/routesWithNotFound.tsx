import NotFound from "@/pages/notfound/NotFound"
import React from "react"
import { Route, Routes } from "react-router-dom"

interface Props {
  children: React.ReactNode
}

function routesWithNotFound({ children }: Props) {
  return (
    <Routes>
      { children }
      <Route path="*" element={<NotFound />}/>
    </Routes>    
  )
}
export default routesWithNotFound