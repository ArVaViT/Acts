import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { authService } from '@/services/auth'
import type { User } from '@/types'
import { Settings, LogOut } from 'lucide-react'

interface HeaderProps {
  user: User | null
  setUser: (user: User | null) => void
}

export default function Header({ user, setUser }: HeaderProps) {
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          Bible School
        </Link>
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Настройки
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Выйти
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Войти
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">
                  Регистрация
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

