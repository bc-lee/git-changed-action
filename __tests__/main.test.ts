import {formatErrorOfGitStatus} from "../src/main"

test("Truncate Long message", async () => {
  const lines = ` D api/BUILD.gn
 D api/DEPS
 D api/DESIGN.md
 D api/OWNERS
 D api/README.md
 D api/adaptation/BUILD.gn
 D api/adaptation/DEPS
 D api/adaptation/resource.cc
 D api/adaptation/resource.h
 D api/array_view.h
 D api/array_view_unittest.cc
 D api/async_resolver_factory.h
 D api/audio/BUILD.gn
 D api/audio/OWNERS
 D api/audio/audio_frame.cc
 D api/audio/audio_frame.h
 D api/audio/audio_mixer.h`.split("\n")

  const expected = ` D api/BUILD.gn
 D api/DEPS
 D api/DESIGN.md
 D api/OWNERS
 D api/README.md
 D api/adaptation/BUILD.gn
 D api/adaptation/DEPS
 D api/adaptation/resource.cc
 D api/adaptation/resource.h
`

  expect(formatErrorOfGitStatus(lines)).toEqual(expected)
})
