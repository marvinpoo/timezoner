import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TimeDisplay } from './components/TimeDisplay';
import { TimezoneSearch } from './components/TimezoneSearch';
import { ThemeToggle } from './components/ThemeToggle';
import { GroupSelector } from './components/GroupSelector';
import { LanguageSelector } from './components/LanguageSelector';
import { Footer } from './components/Footer';
import { EditableTitle } from './components/EditableTitle';
import { LogoIcon } from './components/LogoIcon';
import { timezones } from './data/timezones';
import { useTimezoneGroups } from './hooks/useTimezoneGroups';
import { parseSharedUrl } from './utils/urlSharing';

function App() {
  const { t } = useTranslation();
  const {
    groups,
    activeGroup,
    activeGroupId,
    setActiveGroupId,
    createGroup,
    updateGroup,
    deleteGroup,
    getShareableLink,
  } = useTimezoneGroups();
  const [isListEditMode, setIsListEditMode] = useState(false);

  React.useEffect(() => {
    if (groups.length === 0) {
      const newGroup = createGroup(t('newGroup'));
      setActiveGroupId(newGroup.id);
    }
  }, []);

  React.useEffect(() => {
    console.log('Checking shared URL ...');
    const cities = parseSharedUrl(new URLSearchParams(window.location.search));
    console.log('Parsed cities:', cities);

    if (cities.length > 0) {
      const groupName = cities[0];
      console.log('Creating group from URL, Name:', groupName);

      const newGroup = createGroup(groupName);
      setActiveGroupId(newGroup.id);
    }
  }, []);

  const handleAddTimezone = (timezone: any) => {
    if (!activeGroup) return;

    if (!activeGroup.mainTimezone) {
      updateGroup(activeGroupId, { mainTimezone: timezone });
    } else if (activeGroup.comparedTimezones.length < 10) {
      updateGroup(activeGroupId, {
        comparedTimezones: [...activeGroup.comparedTimezones, timezone],
      });
    }
  };

  const handleRemoveTimezone = (index: number) => {
    if (activeGroup) {
      updateGroup(activeGroupId, {
        comparedTimezones: activeGroup.comparedTimezones.filter((_, i) => i !== index),
      });
    }
  };

  const handleRemoveMainTimezone = () => {
    if (activeGroup) {
      if (activeGroup.comparedTimezones.length > 0) {
        updateGroup(activeGroupId, {
          mainTimezone: activeGroup.comparedTimezones[0],
          comparedTimezones: activeGroup.comparedTimezones.slice(1),
        });
      } else {
        updateGroup(activeGroupId, { mainTimezone: null });
      }
    }
  };

  const handleTitleChange = (newTitle: string) => {
    if (activeGroup) {
      updateGroup(activeGroupId, { name: newTitle });
    }
  };

  return (
    <div className="app">
      <div className="top-bar">
        <div className="top-bar-left">
          <GroupSelector
            groups={groups}
            activeGroupId={activeGroupId}
            onSelectGroup={setActiveGroupId}
            onCreateGroup={createGroup}
            onUpdateGroup={(groupId, name) => updateGroup(groupId, { name })}
            onDeleteGroup={deleteGroup}
            getShareableLink={getShareableLink}
          />
        </div>
        <div className="app-title">
          <LogoIcon />
          <span>Timezoner</span>
        </div>
        <div className="top-bar-right">
          <ThemeToggle />
          <LanguageSelector />
        </div>
      </div>

      <header>
        {activeGroup && (
          <EditableTitle 
            value={activeGroup.name} 
            onChange={handleTitleChange}
            onShare={() => getShareableLink(activeGroup.id)}
            onEditModeChange={setIsListEditMode}
          />
        )}
        <p className="subtitle">
          {!activeGroup?.mainTimezone 
            ? t('selectReferenceTimezone')
            : t('comparingTimesRelativeTo', {
                city: activeGroup.mainTimezone.city,
                country: activeGroup.mainTimezone.country
              })}
        </p>
        <TimezoneSearch
          timezones={timezones}
          onSelect={handleAddTimezone}
          disabled={!activeGroup || (activeGroup.mainTimezone && activeGroup.comparedTimezones.length >= 10)}
          placeholder={!activeGroup?.mainTimezone 
            ? t('searchReferenceTimezone')
            : t('searchCompareTimezones')}
        />
      </header>

      <main className="timeline-focused">
        {activeGroup?.mainTimezone && (
          <div className="reference-timezone">
            <TimeDisplay
              timezone={activeGroup.mainTimezone.value}
              label={`${activeGroup.mainTimezone.city}, ${activeGroup.mainTimezone.country}`}
              isMain
              onRemove={handleRemoveMainTimezone}
              showDeleteButton={isListEditMode}
            />
          </div>
        )}
        
        {activeGroup?.comparedTimezones.length > 0 && (
          <div className="compared-timezones">
            {activeGroup.comparedTimezones.map((tz, index) => (
              <TimeDisplay
                key={`${tz.value}-${index}`}
                timezone={tz.value}
                label={`${tz.city}, ${tz.country}`}
                onRemove={() => handleRemoveTimezone(index)}
                showDeleteButton={isListEditMode}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;