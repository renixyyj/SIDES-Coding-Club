//
//  AppDelegate.swift
//  macOS (App)
//
//  Created by Cory Finer on 2021-12-14.
//

import Cocoa

//@main
class AppDelegate1: NSObject, NSApplicationDelegate {

    func applicationDidFinishLaunching(_ notification: Notification) {
        // Override point for customization after application launch.
        NSLog("App Launch")
        NSApplication.shared.terminate(self)
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return true
    }

}
