import { useNavigate } from "react-router-dom";

import { FiSearch } from "react-icons/fi";
import avatarPlaceholder from "../../assets/avatar_placeholder.svg";
import { Input } from "../../components/Input";
import { Container, Profile, Brand, Search, Logout } from "./style";

import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";

export function Header({ search, setSearch }) {
  const { signOut, user } = useAuth();

  const navigation = useNavigate();

  const avatarURL = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceholder;

  function handleSignOut() {
    navigation("/");
    signOut();
  }

  function handleProfile() {
    navigation("/profile");
  }

  return (
    <Container>
      <Brand>
        <h1>RocketMovies</h1>
      </Brand>

      <Search>
        <Input
          placeholder="Pesquisar pelo título"
          icon={FiSearch}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Search>

      <Profile>
        <div>
          <strong onClick={handleProfile}>{user.name}</strong>
          <Logout onClick={handleSignOut}>
            <span>sair</span>
          </Logout>
        </div>

        <img src={avatarURL} alt="{user.name}" onClick={handleProfile} />
      </Profile>
    </Container>
  );
}
