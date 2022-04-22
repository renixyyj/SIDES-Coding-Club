//
//  AppDelegate.swift
//  iOS (App)
//
//  Created by Cory Finer on 2021-12-14.
//

import UIKit

//@main
class AppDelegateIOS: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        NSLog("HP Launched")
        guard let url = URL(string: "https://google.com") else { return true }
        application.open(url)
        return true
    }

    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }
    
    func applicationWillTerminate(_ application: UIApplication) {
        NSLog("Terminating");
    }

}
