import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'

import NavBar from '@/components/NavBar'
import Billboard from '@/components/Billboard'
import MovieLists from '@/components/MovieLists'
import useMovieList from '@/hooks/useMovieList'
import useFavorites from '@/hooks/useFavorites'
import InfoModal from '@/components/InfoModal'
import useInfoModal from '@/hooks/useInfoModal'

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default function Home() {
  const { data: movies = [] } = useMovieList()
  const { data: favorites = [] } = useFavorites()
  const { isOpen, closeModal } = useInfoModal()

  return (
    <>
      <InfoModal
        visible={isOpen}
        onClose={closeModal}
      />

      <NavBar />
      <Billboard />
      <div className="pb-10">
        <MovieLists
          title="Trending Now"
          data={movies}
        />
        <MovieLists
          title="My List"
          data={favorites}
        />
      </div>
    </>
  )
}
