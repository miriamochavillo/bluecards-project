import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// layouts and pages
import RootLayout from "../shared/ui/RootLayout";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Flashcards from "../pages/Flashcards";
import CreateFlashcards from "../pages/CreateFlashcards";
// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/flashcards" element={<Flashcards />} />
      <Route path="/create-flashcards" element={<CreateFlashcards />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
