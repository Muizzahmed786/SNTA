import type { ChangeEvent, FormEvent } from 'react'
import { AppIcon } from '../../components/AppIcon'
import { Card, PageHeader } from '../../components/ui'
import { useAppState } from '../../state/AppStateContext'

export function SettingsPage() {
  const { state, update, restoreSample, clearData } = useAppState()
  const settings = state.settings

  const preventSubmit = (event: FormEvent) => {
    event.preventDefault()
  }

  const updateName = (event: ChangeEvent<HTMLInputElement>) => {
    update((draft) => {
      draft.settings.name = event.target.value
      draft.sample = false
    })
  }

  const updateTextSize = (event: ChangeEvent<HTMLSelectElement>) => {
    update((draft) => {
      draft.settings.text = Number(event.target.value)
    })
  }

  const updateContrast = (event: ChangeEvent<HTMLInputElement>) => {
    update((draft) => {
      draft.settings.contrast = event.target.checked
    })
  }

  const updateSound = (event: ChangeEvent<HTMLInputElement>) => {
    update((draft) => {
      draft.settings.sound = event.target.checked
    })
  }

  const updateTheme = (theme: 'light' | 'dark') => {
    update((draft) => {
      draft.settings.theme = theme
    })
  }

  const updatePin = (event: ChangeEvent<HTMLInputElement>) => {
    update((draft) => {
      draft.settings.pin = event.target.value
    })
  }

  const copyData = () => {
    void navigator.clipboard.writeText(JSON.stringify(state, null, 2))
  }

  const deleteData = () => {
    if (window.confirm('Delete all local prototype data?')) {
      clearData()
    }
  }

  return (
    <>
      <PageHeader
        title="Settings"
        eyebrow="Care workspace · Preferences"
        description="Adjust the experience for comfort, clarity and the needs of this household."
      />
      <div className="grid2">
        <Card>
          <h2>Screen and sound</h2>
          <form className="f" onSubmit={preventSubmit}>
            <label className="l">
              Patient&apos;s first name
              <input value={settings.name} onChange={updateName} />
            </label>
            <label className="l">
              Text size
              <select value={settings.text} onChange={updateTextSize}>
                <option value="0">Large</option>
                <option value="1">Larger</option>
                <option value="2">Largest</option>
              </select>
            </label>
            <fieldset className="theme-choice">
              <legend>Colour theme</legend>
              <div>
                <button
                  type="button"
                  aria-pressed={settings.theme === 'light'}
                  onClick={() => {
                    updateTheme('light')
                  }}
                >
                  <AppIcon name="sun" size={20} />
                  Light
                </button>
                <button
                  type="button"
                  aria-pressed={settings.theme === 'dark'}
                  onClick={() => {
                    updateTheme('dark')
                  }}
                >
                  <AppIcon name="moon" size={20} />
                  Dark
                </button>
              </div>
            </fieldset>
            <label className="check">
              <input type="checkbox" checked={settings.contrast} onChange={updateContrast} /> High
              contrast colours
            </label>
            <label className="check">
              <input type="checkbox" checked={settings.sound} onChange={updateSound} /> Sounds and
              chimes
            </label>
            <label className="l">
              Caregiver PIN
              <input type="password" value={settings.pin} onChange={updatePin} />
            </label>
          </form>
        </Card>
        <Card>
          <h2>Your data</h2>
          <p>Everything is saved in this browser on this device only.</p>
          <div className="row">
            <button className="btn" onClick={copyData}>
              Copy all data
            </button>
            <button className="btn" onClick={restoreSample}>
              Restore sample data
            </button>
            <button className="btn danger" onClick={deleteData}>
              Delete all data
            </button>
          </div>
        </Card>
      </div>
    </>
  )
}
